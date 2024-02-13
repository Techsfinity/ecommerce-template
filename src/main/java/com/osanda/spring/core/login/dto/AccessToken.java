package com.osanda.spring.core.login.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessToken implements Serializable {

	private static final long serialVersionUID = -1521978712801436019L;

	private String access_token;

	private Long expires_in;

	private String refresh_token;

	private String session_state;

	private String scope;

	private String refresh_expires_in;

	private String token_type;
}
