package com.osanda.spring.modules.workflow.selectProduct;

import org.springframework.data.rest.core.config.Projection;

import com.osanda.spring.modules.workflow.product.ProductProjection.ProductBasicProjection;

public interface SelectProductProjection {

	@Projection(name = "basic", types = SelectProduct.class)
	public interface SelectProductBasicProjection {

		Long getId();
		
		Double getQuantity();

		ProductBasicProjection getProduct();

	}

}
