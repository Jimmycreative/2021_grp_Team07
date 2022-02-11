package org.ssssssss.magicapi.model;

/**
 * 消息通知对象
 *
 * @author mxd
 */
public class MagicNotify {

	/**
	 * 消息来源(instanceId)
	 */
	private String from;

	/**
	 * 对应的id，如接口id、函数id，分组id、数据源id
	 */
	private String id;

	/**
	 * 动作
	 */
	private int action = -1;

	/**
	 * 操作对象，如接口、函数、分组、数据源
	 */
	private int type = -1;

	/**
	 * WebSocket sessionId
	 */
	private String sessionId;

	/**
	 * WebSocket消息内容
	 */
	private String content;

	public MagicNotify() {
	}

	public MagicNotify(String from) {
		this(from, null, Constants.NOTIFY_ACTION_ALL, Constants.NOTIFY_ACTION_ALL);
	}

	public MagicNotify(String from, int action, String sessionId, String content) {
		this.from = from;
		this.sessionId = sessionId;
		this.action = action;
		this.content = content;
	}

	public MagicNotify(String from, String id, int action, int type) {
		this.from = from;
		this.id = id;
		this.action = action;
		this.type = type;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getAction() {
		return action;
	}

	public void setAction(int action) {
		this.action = action;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("MagicNotify(from=");
		builder.append(from);
		builder.append(", action=");
		switch (action) {
			case Constants.NOTIFY_ACTION_ADD:
				builder.append("新增");
				break;
			case Constants.NOTIFY_ACTION_UPDATE:
				builder.append("修改");
				break;
			case Constants.NOTIFY_ACTION_DELETE:
				builder.append("删除");
				break;
			case Constants.NOTIFY_ACTION_ALL:
				builder.append("刷新全部");
				break;
			case Constants.NOTIFY_WS_C_S:
				builder.append("通知客户端发来的消息");
				builder.append(", sessionId=").append(sessionId);
				builder.append(", content=").append(content);
				break;
			case Constants.NOTIFY_WS_S_C:
				builder.append("通知服务端发送给客户端的消息");
				builder.append(", sessionId=").append(sessionId);
				builder.append(", content=").append(content);
				break;
			default:
				builder.append("未知");
		}
		if (action != Constants.NOTIFY_ACTION_ALL && action < Constants.NOTIFY_WS_C_S) {
			builder.append(", type=");
			switch (type) {
				case Constants.NOTIFY_ACTION_API:
					builder.append("接口");
					break;
				case Constants.NOTIFY_ACTION_FUNCTION:
					builder.append("函数");
					break;
				case Constants.NOTIFY_ACTION_DATASOURCE:
					builder.append("数据源");
					break;
				case Constants.NOTIFY_ACTION_GROUP:
					builder.append("分组");
					break;
				default:
					builder.append("未知");
			}
			builder.append(", id=");
			builder.append(id);
		}
		builder.append(")");
		return builder.toString();
	}
}
