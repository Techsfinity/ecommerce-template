package com.osanda.spring.core.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUserName(String username);

	User findByEmail(String email);

}
