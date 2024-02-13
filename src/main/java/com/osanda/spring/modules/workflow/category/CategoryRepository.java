package com.osanda.spring.modules.workflow.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface CategoryRepository extends JpaRepository<Category, Long>, QuerydslPredicateExecutor<Category>,
		QuerydslBinderCustomizer<QCategory> {

	@Override
	default void customize(QuerydslBindings bindings, QCategory category) {

		bindings.bind(category.name).first((path, value) -> path.containsIgnoreCase(value));
	}

}
