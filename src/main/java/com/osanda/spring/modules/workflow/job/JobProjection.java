package com.osanda.spring.modules.workflow.job;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.osanda.spring.modules.workflow.comment.Comment;
import com.osanda.spring.modules.workflow.customer.Customer;
import com.osanda.spring.modules.workflow.selectProduct.SelectProductProjection.SelectProductBasicProjection;

public interface JobProjection {

	@Projection(name = "full", types = Job.class)
	public interface JobBasicProjection {

		Long getId();
		
		String getName();

		Date getEndDate();

		@Value("#{target.status != null ? target.status.name : null}")
		String getStatus();

		@Value("#{target.type != null ? target.type.name : null}")
		String getType();

		Customer getCustomer();

		List<Comment> getComments();

		Set<SelectProductBasicProjection> getSelectProducts();

		Double getTotal();

		Double getExtraCost();
		
		String getExtraCostName();

		Double getAdvance();

		String getRemarks();

	}

}
