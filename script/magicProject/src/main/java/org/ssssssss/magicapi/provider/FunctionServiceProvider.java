package org.ssssssss.magicapi.provider;

import org.ssssssss.magicapi.adapter.Resource;
import org.ssssssss.magicapi.model.FunctionInfo;

/**
 * 函数存储抽象类
 *
 * @author mxd
 */
public abstract class FunctionServiceProvider extends StoreServiceProvider<FunctionInfo> {

	public FunctionServiceProvider(Resource workspace, GroupServiceProvider groupServiceProvider) {
		super(FunctionInfo.class, workspace, groupServiceProvider);
	}

	public boolean exists(FunctionInfo info) {
		return infos.values().stream()
				.anyMatch(it -> info.getGroupId().equals(it.getGroupId()) && (info.getName().equals(it.getName()) || info.getPath().equals(it.getPath())));
	}

	public boolean existsWithoutId(FunctionInfo info) {
		return infos.values().stream()
				.anyMatch(it -> !info.getId().equals(it.getId()) && info.getGroupId().equals(it.getGroupId()) && (info.getName().equals(it.getName()) || info.getPath().equals(it.getPath())));
	}
}
