package com.osanda.spring.modules.workflow.comment;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.hrandika.spring.silvers.entitymeta.annotations.Extendz;
import com.hrandika.spring.silvers.entitymeta.annotations.enums.InputType;
import com.osanda.spring.core.AbstractAuditingEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends AbstractAuditingEntity {

	private static final long serialVersionUID = 6265551204147280550L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String description;

	@NotNull
	private String userName;

	@Extendz(type = InputType.DATE)
	@Temporal(TemporalType.TIMESTAMP)
	private Date date = new Date();

}
