package com.osanda.spring.modules.workflow.job;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hrandika.spring.silvers.entitymeta.annotations.Extendz;
import com.hrandika.spring.silvers.entitymeta.annotations.enums.InputType;
import com.osanda.spring.core.AbstractAuditingEntity;
import com.osanda.spring.modules.workflow.comment.Comment;
import com.osanda.spring.modules.workflow.customer.Customer;
import com.osanda.spring.modules.workflow.job.status.JobStatus;
import com.osanda.spring.modules.workflow.job.type.JobType;
import com.osanda.spring.modules.workflow.selectProduct.SelectProduct;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Audited
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Job extends AbstractAuditingEntity {

	private static final long serialVersionUID = 542145517454829948L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Extendz(type = InputType.DATE)
	@Temporal(TemporalType.DATE)
	private Date startDate = new Date();

	@Extendz(type = InputType.DATE)
	@Temporal(TemporalType.DATE)
	private Date endDate;

	@NotAudited
	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private JobStatus status;

	@NotAudited
	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private JobType type;

	@NotAudited
	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private Customer customer;

	@NotAudited
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Comment> comments = new ArrayList<>();

	@NotAudited
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "job_select_products", joinColumns = {
			@JoinColumn(name = "job_id", referencedColumnName = "id", nullable = true) }, inverseJoinColumns = {
					@JoinColumn(name = "select_product_id", referencedColumnName = "id", nullable = true) })
	private Set<SelectProduct> selectProducts = new HashSet<>();

	private String remarks;

	// payment details
	private Double total;

	private Double advance;

	private Double extraCost;
	
	private String extraCostName;
	
	private Boolean active = true;
}