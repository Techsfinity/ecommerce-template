package com.osanda.spring.modules.workflow.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface ProductRepository
		extends JpaRepository<Product, Long>, QuerydslPredicateExecutor<Product>, QuerydslBinderCustomizer<QProduct> {

	Product findByName(String name);

	@Override
	default void customize(QuerydslBindings bindings, QProduct product) {

		bindings.bind(product.name).first((path, value) -> {
			if (value.length() > 1) {
				return product.name.containsIgnoreCase(value).or(product.code.containsIgnoreCase(value));
			}
			return null;

		});
		bindings.bind(product.category.name).first((path, value) -> path.containsIgnoreCase(value));
	}

}
