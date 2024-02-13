package com.osanda.spring.config.persistence;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SpringAuditorAware implements AuditorAware<String> {

	public Optional<String> getCurrentAuditor() {

		Authentication authentication = null;
		try {
			authentication = SecurityContextHolder.getContext().getAuthentication();
		} catch (Exception e) {
			log.error("No principal found", e);
		}

		if (authentication == null || !authentication.isAuthenticated()) {
			return Optional.of("SYSTEM");
		}

		return Optional.of(authentication.getName());

	}

}
