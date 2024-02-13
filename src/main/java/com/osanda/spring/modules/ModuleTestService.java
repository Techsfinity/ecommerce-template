package com.osanda.spring.modules;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.osanda.spring.core.role.Role;
import com.osanda.spring.core.role.RoleRepository;
import com.osanda.spring.core.user.User;
import com.osanda.spring.core.user.UserRepository;
import com.osanda.spring.utils.RoleUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ModuleTestService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;

	public void createSuperAdminUserOnInit() {

		this.createInitialRoles();

		String userName = "superadmin";
		String email = "superadmin@gmail.com";

		User user = this.userRepository.findByUserName(userName);

		if (user == null) {

			user = new User();
			user.setUserName(userName);
			user.setPassword("$admin#123");
			user.setActive(true);
			user.setEmail(email);
			user.setFirstName("Super");
			user.setLastName("Admin");
			;

			Set<Role> roles = new HashSet<>();
			roles.add(this.roleRepository.findByName(RoleUtil.ROLE_ADMIN));
			roles.add(this.roleRepository.findByName(RoleUtil.ROLE_SUPER_ADMIN));
			roles.add(this.roleRepository.findByName(RoleUtil.ROLE_USER));

			user.setRoles(roles);

			this.userRepository.save(user);
			log.info("New User created : " + user.getUserName());
		}

	}// createAdminUserOnInit()

	private void createInitialRoles() {

		this.createRoleByNameIfDoesNotExist(RoleUtil.ROLE_ADMIN);
		this.createRoleByNameIfDoesNotExist(RoleUtil.ROLE_SUPER_ADMIN);
		this.createRoleByNameIfDoesNotExist(RoleUtil.ROLE_USER);

	}// createInitialRoles()

	private void createRoleByNameIfDoesNotExist(String role) {

		Role userRole = this.roleRepository.findByName(role);

		if (userRole == null) {
			userRole = new Role();
			userRole.setName(role);

			this.roleRepository.save(userRole);
			log.info("New Role created : " + userRole.getName());
		}

	}// createRoleByNameIfDoesNotExist()

}// ModuleTestService {}
