package com.osanda.spring.modules.workflow.selectProduct;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface SelectProductRepository extends JpaRepository<SelectProduct, Long> {

}
