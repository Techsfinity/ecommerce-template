package com.osanda.spring.config.jwt;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private @Inject UserDetailsService userDetailsService;

	private @Inject TokenProvider jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {

		String header = req.getHeader(TokenProvider.HEADER_STRING);
		String accessTokenParam = req.getParameter(TokenProvider.PARAM_PREFIX);

		String username = null;
		String authToken = null;

		if (header != null && header.startsWith(TokenProvider.TOKEN_PREFIX)) {
			authToken = header.replace(TokenProvider.TOKEN_PREFIX, "");
			try {
				username = jwtTokenUtil.getUsernameFromToken(authToken);
			} catch (IllegalArgumentException e) {
				log.error("an error occured during getting username from token", e);
			} catch (ExpiredJwtException e) {
				log.warn("the token is expired and not valid anymore", e);
			} catch (SignatureException e) {
				log.error("Authentication Failed. Username or Password not valid.");
			}
		}
		// if "access_token param presents"
		else if (accessTokenParam != null) {

			authToken = accessTokenParam;

			try {
				username = jwtTokenUtil.getUsernameFromToken(authToken);
			} catch (IllegalArgumentException e) {
				log.error("an error occured during getting username from token", e);
			} catch (ExpiredJwtException e) {
				log.warn("the token is expired and not valid anymore", e);
			} catch (SignatureException e) {
				log.error("Authentication Failed. Username or Password not valid.");
			}
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			if (jwtTokenUtil.validateToken(authToken, userDetails)) {
				UsernamePasswordAuthenticationToken authentication = jwtTokenUtil.getAuthentication(authToken,
						SecurityContextHolder.getContext().getAuthentication(), userDetails);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
				
				//log.info("Authenticated user " + username + ", setting security context");
				
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}

		chain.doFilter(req, res);
	}// doFilterInternal()

}// JwtAuthenticationFilter{}
