package com.osanda.spring.modules.workflow.job.type;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface JobTypeRepository extends JpaRepository<JobType, Long> {

	JobType findByName(String name);

}
