package com.osanda.spring.core.login.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Credentials implements Serializable {

	private static final long serialVersionUID = 8206628039030681303L;

	private String email;
	private String password;

}
