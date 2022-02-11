package org.ssssssss.magicapi.logging;

import org.ssssssss.magicapi.config.MessageType;
import org.ssssssss.magicapi.config.WebSocketSessionManager;

import java.util.Collections;

/**
 * 日志上下文
 *
 * @author mxd
 */
public interface MagicLoggerContext {

	String LOGGER_NAME = "magic";

	ThreadLocal<String> SESSION = new InheritableThreadLocal<>();

	/**
	 * 打印日志
	 * re
	 *
	 * @param logInfo 日志信息
	 */
	static void println(String logInfo) {
		// 获取SessionId
		String sessionId = SESSION.get();
		if (sessionId != null) {
			WebSocketSessionManager.sendBySessionId(sessionId, MessageType.LOG, Collections.singletonList(logInfo));
		}
	}

	/**
	 * 移除ThreadLocal中的sessionId
	 */
	static void remove() {
		SESSION.remove();
	}

	/**
	 * 生成appender
	 */
	void generateAppender();
}
