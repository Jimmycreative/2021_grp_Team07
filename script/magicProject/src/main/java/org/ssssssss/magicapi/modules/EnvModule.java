package org.ssssssss.magicapi.modules;

import org.springframework.core.env.Environment;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.script.annotation.Comment;

/**
 * env模块
 *
 * @author mxd
 */
public class EnvModule implements MagicModule {

	private final Environment environment;

	public EnvModule(Environment environment) {
		this.environment = environment;
	}

	@Override
	public String getModuleName() {
		return "env";
	}

	@Comment("获取配置")
	public String get(@Comment(name = "key", value = "配置项") String key) {
		return environment.getProperty(key);
	}

	@Comment("获取配置")
	public String get(@Comment(name = "key", value = "配置项") String key,
					  @Comment(name = "defaultValue", value = "未配置时的默认值") String defaultValue) {
		return environment.getProperty(key, defaultValue);
	}
}
