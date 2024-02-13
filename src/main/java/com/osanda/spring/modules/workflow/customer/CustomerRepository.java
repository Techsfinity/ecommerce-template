package com.osanda.spring.modules.workflow.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface CustomerRepository extends JpaRepository<Customer, Long> {

	Customer findByPhone(String phone);

}
