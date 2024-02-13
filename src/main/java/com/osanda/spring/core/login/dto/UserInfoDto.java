package com.osanda.spring.core.login.dto;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoDto implements Serializable {

	private static final long serialVersionUID = -2648268394915413849L;

	private String sub;

	private String email_verified;

	private String name;

	private String preferred_username;

	private String given_name;

	private String family_name;

	private String email;

	private String full;

}
