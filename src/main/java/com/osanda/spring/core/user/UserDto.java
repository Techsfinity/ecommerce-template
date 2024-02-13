package com.osanda.spring.core.user;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.osanda.spring.core.role.RoleDto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class UserDto implements Serializable {

	private static final long serialVersionUID = 2763425460876793298L;

	private Long id;

	private String sub;

	private String userName;
	private String firstName;
	private String lastName;
	private String email;

	private Boolean active;

	private String mobile;

	// additional field for user
	private String password;

	private Set<RoleDto> roles;
	private Set<String> updatedRoles;

	public UserDto(User user) {

		this.userName = user.getUserName();
		this.active = user.getActive();
		this.email = user.getEmail();
		this.roles = user.getRoles() == null ? new HashSet<>()
				: user.getRoles().stream().map(r -> new RoleDto(r)).collect(Collectors.toSet());

	}

}
