package org.ssssssss.magicapi.exception;

import org.ssssssss.magicapi.model.JsonCode;

/**
 * 接口验证异常
 *
 * @author mxd
 */
public class ValidateException extends RuntimeException {

	private final JsonCode jsonCode;

	public ValidateException(JsonCode jsonCode, String message) {
		super(message);
		this.jsonCode = jsonCode;
	}

	public JsonCode getJsonCode() {
		return jsonCode;
	}
}
