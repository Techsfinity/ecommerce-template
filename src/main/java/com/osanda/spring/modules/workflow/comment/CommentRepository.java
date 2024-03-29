package com.osanda.spring.modules.workflow.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = true)
public interface CommentRepository extends JpaRepository<Comment, Long>{

}
