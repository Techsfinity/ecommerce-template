package com.osanda.spring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class GlobalRepositoryRestConfigurer implements RepositoryRestConfigurer {

	@Value("${spring.data.rest.base-path}")
	private String basePath;

	@Value("${spring.profiles.active}")
	private String activeProfile;

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

		if (activeProfile.equalsIgnoreCase("dev"))
			config.getCorsRegistry().addMapping(String.format("%s/**", basePath)).allowedOrigins("*")
					.allowedMethods("*").allowedHeaders("*");
	}// configureRepositoryRestConfiguration()

}
