package com.osanda.spring.modules.workflow.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

public interface ProductProjection {

	@Projection(name = "dataTable", types = Product.class)
	public interface ProductDataTableProjection {

		String getName();

		Double getPrice();

		Double getQuantity();

		String getUnit();

		String getCode();

		@Value("#{target.category != null ? target.category.name : null}")
		String getCategory();

	}

	@Projection(name = "basic", types = Product.class)
	public interface ProductBasicProjection {

		String getName();

		Double getPrice();

		Double getQuantity();

		String getUnit();

		@Value("#{target.category != null ? target.category.name : null}")
		String getCategory();

	}

	@Projection(name = "all", types = Product.class)
	public interface ProductAllProjection {

		Long getId();

		String getName();

		Double getPrice();

		Double getQuantity();

		String getUnit();

		String getDescription();

		String getCode();

		@Value("#{target.category != null ? target.category.name : null}")
		String getCategory();

		List<String> getImages();

	}

}
