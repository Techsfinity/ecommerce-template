package com.osanda.spring;

import javax.inject.Inject;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.config.EnableHypermediaSupport;
import org.springframework.web.filter.ForwardedHeaderFilter;

import com.osanda.spring.modules.ModuleTestService;

@EnableCaching
@SpringBootApplication
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
public class TuskerApplication implements CommandLineRunner {

	private @Inject ModuleTestService moduleTestService;

	public static void main(String[] args) {
		SpringApplication.run(TuskerApplication.class, args);
	}

	@Bean
	FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
		FilterRegistrationBean<ForwardedHeaderFilter> bean = new FilterRegistrationBean<>();
		bean.setFilter(new ForwardedHeaderFilter());
		return bean;
	}// forwardedHeaderFilter()

	@Override
	public void run(String... args) throws Exception {
		this.moduleTestService.createSuperAdminUserOnInit();
	}

}// TuskerApplication {}
