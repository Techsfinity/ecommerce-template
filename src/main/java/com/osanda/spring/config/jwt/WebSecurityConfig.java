package com.osanda.spring.config.jwt;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.osanda.spring.utils.RoleUtil;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Value("${spring.data.rest.base-path}")
	private String basePath;

	// private final CustomUserDetailsService userDetailsService;
	private final UserDetailsService userDetailsService;

	private final JwtAuthenticationEntryPoint unauthorizedHandler;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Inject
	public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(encoder());
	}

	@Bean
	public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
		return new JwtAuthenticationFilter();
	}

	@Bean
	public BCryptPasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public void configure(WebSecurity webSecurity) {
		webSecurity.ignoring()
		.antMatchers("/assets/**")
		.antMatchers(HttpMethod.POST, String.format("%s/login/token", basePath));
		//.antMatchers(HttpMethod.GET, String.format("%s/products/**", basePath));
	}
	
	private String [] workflowUser =  {RoleUtil.ADMIN, RoleUtil.USER};

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.authorizeRequests()
		
				//user creation only for superadmin
				.antMatchers(String.format("%s/users", basePath)).hasRole(RoleUtil.SUPER_ADMIN)
				
				.antMatchers(HttpMethod.DELETE, String.format("%s/**", basePath)).hasAnyRole(RoleUtil.SUPER_ADMIN)
				
				.antMatchers(HttpMethod.GET, String.format("%s/**", basePath)).hasAnyRole(workflowUser)
				.antMatchers(HttpMethod.POST, String.format("%s/**", basePath)).hasAnyRole(workflowUser)
				.antMatchers(HttpMethod.PUT, String.format("%s/**", basePath)).hasAnyRole(workflowUser)
				.antMatchers(HttpMethod.PATCH, String.format("%s/**", basePath)).hasAnyRole(workflowUser)
				.antMatchers(HttpMethod.HEAD, String.format("%s/**", basePath)).hasAnyRole(workflowUser);

		http.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
				// create stateless
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				// cors
				.and().cors()
				// csrf
				.and().csrf().disable().headers().frameOptions().disable()
				// Permitted without authorization
				.and().authorizeRequests().antMatchers("/**").permitAll().anyRequest().authenticated();

		http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

	}// configure()

}// WebSecurityConfig()
