package com.osanda.spring.modules.workflow.product;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hrandika.spring.silvers.entitymeta.annotations.Extendz;
import com.hrandika.spring.silvers.entitymeta.annotations.enums.InputType;
import com.osanda.spring.core.AbstractAuditingEntity;
import com.osanda.spring.modules.workflow.category.Category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Audited
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "name", "code" }) })
public class Product extends AbstractAuditingEntity {

	private static final long serialVersionUID = 8815511916941189804L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String name;

	private Double quantity;

	private Double price;

	private String unit;

	@Column(length = 1000)
	private String description;

	private String code;

	@ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private Category category;

	// keep saved images location
	@NotAudited
	@ElementCollection
	@CollectionTable(name = "product_images")
	@Extendz(type = InputType.FILE)
	private List<String> images;
	
	private Boolean active = true;

}
