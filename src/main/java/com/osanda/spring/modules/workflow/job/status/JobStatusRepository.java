package com.osanda.spring.modules.workflow.job.status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface JobStatusRepository extends JpaRepository<JobStatus, Long> {

	JobStatus findByName(String name);

}
