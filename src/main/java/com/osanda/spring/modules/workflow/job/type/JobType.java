package com.osanda.spring.modules.workflow.job.type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.osanda.spring.core.AbstractAuditingEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class JobType extends AbstractAuditingEntity {

	private static final long serialVersionUID = -5337065603101934451L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Size(min = 0, max = 50)
	@Column(length = 50, unique = true)
	private String name;

	private Boolean active = true;

}
