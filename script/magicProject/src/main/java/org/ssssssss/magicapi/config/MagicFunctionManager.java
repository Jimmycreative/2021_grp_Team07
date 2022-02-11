package org.ssssssss.magicapi.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.ssssssss.magicapi.model.FunctionInfo;
import org.ssssssss.magicapi.model.Group;
import org.ssssssss.magicapi.model.Parameter;
import org.ssssssss.magicapi.model.TreeNode;
import org.ssssssss.magicapi.provider.FunctionServiceProvider;
import org.ssssssss.magicapi.provider.GroupServiceProvider;
import org.ssssssss.magicapi.script.ScriptManager;
import org.ssssssss.magicapi.utils.PathUtils;
import org.ssssssss.script.MagicResourceLoader;
import org.ssssssss.script.MagicScriptContext;
import org.ssssssss.script.exception.MagicExitException;
import org.ssssssss.script.runtime.ExitValue;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 函数映射管理
 *
 * @author mxd
 */
public class MagicFunctionManager {

	private static final Logger logger = LoggerFactory.getLogger(MagicFunctionManager.class);
	private static final Map<String, FunctionInfo> MAPPINGS = new ConcurrentHashMap<>();
	private final GroupServiceProvider groupServiceProvider;
	private final FunctionServiceProvider functionServiceProvider;
	private TreeNode<Group> groups;

	public MagicFunctionManager(GroupServiceProvider groupServiceProvider, FunctionServiceProvider functionServiceProvider) {
		this.groupServiceProvider = groupServiceProvider;
		this.functionServiceProvider = functionServiceProvider;
	}

	public void registerFunctionLoader() {
		MagicResourceLoader.addFunctionLoader((context, path) -> {
			FunctionInfo info = MAPPINGS.get(path);
			if (info != null) {
				String scriptName = groupServiceProvider.getScriptName(info.getGroupId(), info.getName(), info.getPath());
				List<Parameter> parameters = info.getParameters();
				return (Function<Object[], Object>) objects -> {
					MagicScriptContext functionContext = new MagicScriptContext(context.getRootVariables());
					functionContext.setScriptName(scriptName);
					if (objects != null) {
						for (int i = 0, len = objects.length, size = parameters.size(); i < len && i < size; i++) {
							functionContext.set(parameters.get(i).getName(), objects[i]);
						}
					}
					Object value = ScriptManager.executeScript(info.getScript(), functionContext);
					if (value instanceof ExitValue) {
						throw new MagicExitException((ExitValue) value);
					}
					return value;
				};
			}
			return null;
		});
	}

	/**
	 * 加载所有分组
	 */
	public synchronized void loadGroup() {
		groups = groupServiceProvider.functionGroupTree();
	}

	public void registerAllFunction() {
		loadGroup();
		functionServiceProvider.listWithScript().stream()
				.filter(it -> groupServiceProvider.getFullPath(it.getGroupId()) != null)
				.forEach(this::register);
	}

	public boolean hasRegister(FunctionInfo info) {
		String path = PathUtils.replaceSlash(Objects.toString(groupServiceProvider.getFullPath(info.getGroupId()), "") + "/" + info.getPath());
		FunctionInfo functionInfo = MAPPINGS.get(path);
		return functionInfo != null && !Objects.equals(info.getId(), functionInfo.getId());
	}

	public boolean hasRegister(Set<String> paths) {
		return paths.stream().anyMatch(MAPPINGS::containsKey);
	}

	/**
	 * 函数移动
	 */
	public boolean move(String id, String groupId) {
		FunctionInfo info = MAPPINGS.get(id);
		if (info == null) {
			return false;
		}
		String path = Objects.toString(groupServiceProvider.getFullPath(groupId), "");
		FunctionInfo functionInfo = MAPPINGS.get(PathUtils.replaceSlash(path + "/" + info.getPath()));
		if (functionInfo != null && !Objects.equals(functionInfo.getId(), id)) {
			return false;
		}
		unregister(id);
		info.setGroupId(groupId);
		register(info);
		return true;
	}


	public void register(FunctionInfo functionInfo) {
		if (functionInfo == null) {
			return;
		}
		FunctionInfo oldFunctionInfo = MAPPINGS.get(functionInfo.getId());
		if (oldFunctionInfo != null) {
			// 完全一致时不用注册
			if (functionInfo.equals(oldFunctionInfo)) {
				return;
			}
			// 如果路径不一致，则需要取消注册
			if (!Objects.equals(functionInfo.getPath(), oldFunctionInfo.getPath())) {
				unregister(functionInfo.getId());
			}
		}
		String path = Objects.toString(groupServiceProvider.getFullPath(functionInfo.getGroupId()), "");
		MAPPINGS.put(functionInfo.getId(), functionInfo);
		path = PathUtils.replaceSlash(path + "/" + functionInfo.getPath());
		functionInfo.setMappingPath(path);
		MAPPINGS.put(path, functionInfo);
		logger.info("注册函数:[{}:{}]", functionInfo.getName(), path);
	}

	public List<FunctionInfo> getFunctionInfos() {
		return MAPPINGS.values().stream().distinct().collect(Collectors.toList());
	}

	public FunctionInfo getFunctionInfo(String path) {
		return MAPPINGS.get(path);
	}

	private boolean hasConflict(TreeNode<Group> group, String newPath) {
		// 获取要移动的接口
		List<FunctionInfo> infos = MAPPINGS.values().stream()
				.filter(info -> Objects.equals(info.getGroupId(), group.getNode().getId()))
				.distinct()
				.collect(Collectors.toList());
		// 判断是否有冲突
		for (FunctionInfo info : infos) {
			if (MAPPINGS.containsKey(PathUtils.replaceSlash(newPath + "/" + info.getPath()))) {
				return true;
			}
		}
		for (TreeNode<Group> child : group.getChildren()) {
			if (hasConflict(child, newPath + "/" + Objects.toString(child.getNode().getPath(), ""))) {
				return true;
			}
		}
		return false;
	}

	public TreeNode<Group> findGroupTree(String groupId) {
		return groups.findTreeNode(it -> it.getId().equals(groupId));
	}

	public boolean checkGroup(Group group) {
		TreeNode<Group> oldTree = groups.findTreeNode((item) -> item.getId().equals(group.getId()));
		// 如果只改了名字，则不做任何操作
		if (Objects.equals(oldTree.getNode().getParentId(), group.getParentId()) &&
				Objects.equals(oldTree.getNode().getPath(), group.getPath())) {
			return true;
		}
		// 新的接口分组路径
		String newPath = Objects.toString(groupServiceProvider.getFullPath(group.getParentId()), "");
		// 检测冲突
		return !hasConflict(oldTree, newPath + "/" + Objects.toString(group.getPath(), ""));
	}

	private void recurseUpdateGroup(TreeNode<Group> node, boolean updateGroupId) {
		MAPPINGS.values().stream()
				.filter(info -> Objects.equals(info.getGroupId(), node.getNode().getId()))
				.distinct()
				.collect(Collectors.toList())
				.forEach(info -> {
					unregister(info.getId());
					if (updateGroupId) {
						info.setGroupId(node.getNode().getId());
					}
					register(info);
				});
		for (TreeNode<Group> child : node.getChildren()) {
			recurseUpdateGroup(child, false);
		}
	}

	public boolean updateGroup(String groupId) {
		loadGroup();    // 重新加载分组
		TreeNode<Group> groupTreeNode = groups.findTreeNode((item) -> item.getId().equals(groupId));
		recurseUpdateGroup(groupTreeNode, true);
		return functionServiceProvider.reload(groupId);
	}

	public void deleteGroup(List<String> groupIds) {
		MAPPINGS.values().stream()
				.filter(info -> groupIds.contains(info.getGroupId()))
				.distinct()
				.collect(Collectors.toList())
				.forEach(info -> unregister(info.getId()));
		// 刷新分组缓存
		loadGroup();
	}

	public void unregister(String id) {
		FunctionInfo functionInfo = MAPPINGS.remove(id);
		if (functionInfo != null) {
			MAPPINGS.remove(functionInfo.getMappingPath());
			logger.info("取消注册函数:[{},{}]", functionInfo.getName(), functionInfo.getMappingPath());
		}
	}
}
