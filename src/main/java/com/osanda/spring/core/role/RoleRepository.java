package com.osanda.spring.core.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByName(String name);

}
