package com.osanda.spring.modules.workflow.category;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@EntityListeners(AuditingEntityListener.class)
public class Category extends AbstractAuditingEntity {

	private static final long serialVersionUID = 6124024977771162054L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String name;

	@OneToMany(cascade = CascadeType.DETACH, fetch = FetchType.EAGER, mappedBy = "category")
	private Set<Product> products;

	private Boolean active = true;

}
