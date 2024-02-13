package com.osanda.spring.core.login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osanda.spring.config.jwt.TokenProvider;
import com.osanda.spring.core.login.dto.AccessToken;
import com.osanda.spring.core.login.dto.Credentials;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author osanda
 *
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${spring.data.rest.base-path}/login/")
public class LoginController {

	private final TokenProvider jwtTokenUtil;
	private final AuthenticationManager authenticationManager;

	@PostMapping("token")
	public ResponseEntity<?> getUserTokenCustom(@RequestBody Credentials credential) {

		AccessToken userAccessToken = new AccessToken();

		log.info("Getting access token for : " + credential.getEmail());

		try {

			final Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(credential.getEmail(), credential.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);
			final String token = jwtTokenUtil.generateToken(authentication);

			userAccessToken.setAccess_token(token);
			userAccessToken.setExpires_in(TokenProvider.ACCESS_TOKEN_VALIDITY_SECONDS);

			log.info("Access token issued for user : " + credential.getEmail());

		} catch (Exception ex) {
			ex.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting Token.");
		}

		return ResponseEntity.ok(userAccessToken);

	}// getUserToken()

}// LoginController {}
