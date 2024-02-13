package com.osanda.spring.modules.workflow.selectProduct;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.envers.Audited;

import com.osanda.spring.core.AbstractAuditingEntity;
import com.osanda.spring.modules.workflow.product.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Audited
@NoArgsConstructor
public class SelectProduct extends AbstractAuditingEntity {

	private static final long serialVersionUID = 3390692040177862335L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private Product product;

	private Double quantity;

}
