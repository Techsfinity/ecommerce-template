package com.osanda.spring.modules.workflow.job;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface JobRepository
		extends JpaRepository<Job, Long>, QuerydslPredicateExecutor<Job>, QuerydslBinderCustomizer<QJob> {

	@Override
	default void customize(QuerydslBindings bindings, QJob job) {
	}

}
