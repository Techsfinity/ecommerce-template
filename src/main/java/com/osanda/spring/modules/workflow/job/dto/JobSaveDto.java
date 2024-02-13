package com.osanda.spring.modules.workflow.job.dto;

import java.io.Serializable;
import java.util.List;

import com.osanda.spring.modules.workflow.selectProduct.SelectProductDto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class JobSaveDto implements Serializable {

	private static final long serialVersionUID = -1191106922402372705L;

	private Long id;

	private String name;

	private String endDate;

	private String status;

	private String jobType;

	private String customerName;

	private String customerPhone;

	private String comment;

	private String remarks;

	private Double extraCost;

	private String extraCostName;

	private Double advance;

	private Double subTotal;

	List<SelectProductDto> products;

}
