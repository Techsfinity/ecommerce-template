package com.osanda.spring.utils;

import java.util.HashMap;

public class ResponseMessage {

	/**
	 * 
	 * @param message
	 * @return Hash map of the item passed to the object
	 */
	public static HashMap<String, String> createMessage(String message) {
		HashMap<String, String> h = new HashMap<String, String>() {
			private static final long serialVersionUID = 2727481603096642451L;
			{
				put("message", message);
			}
		};
		return h;
	}// End creteMessage()

	public static HashMap<String, String> getError(String message) {
		HashMap<String, String> h = new HashMap<String, String>() {
			private static final long serialVersionUID = 2727481603096642451L;
			{
				put("error", message);
			}
		};
		return h;
	}// End creteMessage()

}
