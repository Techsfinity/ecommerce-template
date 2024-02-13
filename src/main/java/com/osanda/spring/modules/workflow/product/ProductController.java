package com.osanda.spring.modules.workflow.product;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.osanda.spring.modules.extendz.service.LocalFileSaver;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${spring.data.rest.base-path}/products/")
public class ProductController {

	private final LocalFileSaver localFileSaver;

	@PostMapping(value = "{id}/images")
	public ResponseEntity<?> setProfileImage(@PathVariable(value = "id", required = true) Long id,
			@RequestParam(value = "images", required = true) MultipartFile file[], Principal principal,
			HttpServletRequest request) {

		return ResponseEntity.ok(this.localFileSaver.save(request, file));
	}// setProfileImage()

	@GetMapping(value = "{id}/images/{fileName}")
	public void getProfileImage(@PathVariable(value = "id", required = true) Long id,
			@PathVariable("fileName") String fileName, HttpServletRequest request, HttpServletResponse response) {

		this.localFileSaver.get(request, response);
	} // getProfileImage()

}// ProductController {}
