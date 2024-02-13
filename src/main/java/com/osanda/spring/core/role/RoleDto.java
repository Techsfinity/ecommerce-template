package com.osanda.spring.core.role;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoleDto implements Serializable {

	private static final long serialVersionUID = -6327405132253173321L;

	private Long id;
	private String name;

	public RoleDto(Role role) {
		this.name = role.getName();
	}

}
