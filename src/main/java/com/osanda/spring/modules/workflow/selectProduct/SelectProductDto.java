package com.osanda.spring.modules.workflow.selectProduct;

import java.io.Serializable;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class SelectProductDto implements Serializable {

	private static final long serialVersionUID = -4782489556375316622L;

	private String name;

	private Double quantity;

}
