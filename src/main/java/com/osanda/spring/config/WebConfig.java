package com.osanda.spring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${spring.profiles.active}")
	private String activeProfile;

	@Value("${spring.data.rest.base-path}")
	private String basePath;

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		if (activeProfile.equalsIgnoreCase("dev"))
			registry.addMapping(String.format("%s/**", basePath)).allowedOrigins("*").allowedMethods("*")
					.allowedHeaders("*");
	} // addCorsMappings()

}
