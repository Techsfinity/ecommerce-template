package com.osanda.spring.modules.workflow.category;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import com.osanda.spring.modules.workflow.product.ProductProjection.ProductBasicProjection;

public interface CategoryProjection {

	@Projection(name = "basic", types = Category.class)
	public interface CategoryBasicProjection {

		String getName();

		Set<ProductBasicProjection> getProducts();

	}

}
