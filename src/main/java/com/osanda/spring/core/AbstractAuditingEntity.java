package com.osanda.spring.core;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

/**
 * Base abstract class for entities which will hold definitions for created,
 * last modified by and created, last modified by date.
 */

@Getter
@Setter
@Audited
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 2031218620594724618L;

	@CreatedBy
	@JsonIgnore
	@Column(name = "created_by", nullable = true, length = 50, updatable = false)
	private String createdBy;

	@CreatedDate
	@JsonIgnore
	@Column(name = "created_date", nullable = true, updatable = false)
	private Instant createdDate = Instant.now();

	@LastModifiedBy
	@JsonIgnore
	@Column(name = "last_modified_by", length = 50)
	private String lastModifiedBy;

	@LastModifiedDate
	@JsonIgnore
	@Column(name = "last_modified_date")
	private Instant lastModifiedDate = Instant.now();

}
