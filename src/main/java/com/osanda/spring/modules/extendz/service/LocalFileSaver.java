package com.osanda.spring.modules.extendz.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.osanda.spring.core.service.FileConverterService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LocalFileSaver {

	String LOCAL_DIRECTORY = "data";

	@Value("${spring.data.rest.base-path}")
	private String basePath;

	private final FileConverterService fileConverterService;

	/**
	 * get common path to save and server image from request
	 * 
	 * @param request
	 * @return
	 */
	private File getParentFile(HttpServletRequest request) {
		String uri = request.getRequestURI();
		String dirPath = uri.substring(basePath.length());
		return new File(LOCAL_DIRECTORY, dirPath);
	} // getParentFile()

	/***
	 * get saved file names
	 * 
	 * @author Osanda Wedamulla
	 * 
	 * @param request
	 * @param multipartFiles
	 * @return Iterator<String>
	 */
	public Iterator<String> save(HttpServletRequest request, MultipartFile[] multipartFiles) {
		File parentDir = this.getParentFile(request);
		Set<File> savedFiles = fileConverterService.multipartToFile(parentDir, multipartFiles);

		return savedFiles.stream().map(file -> file.getName()).collect(Collectors.toCollection(LinkedList::new))
				.descendingIterator();
	}// save()

	/***
	 * serve image file for the saved directory
	 * 
	 * @author Osanda Wedamulla
	 * 
	 * @param fileName
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void get(HttpServletRequest request, HttpServletResponse response) {

		File exportFile = this.getParentFile(request);

		try {
			ServletContext context = request.getServletContext();
			FileInputStream inputStream = new FileInputStream(exportFile);
			String mimeType = context.getMimeType(exportFile.getName());
			if (mimeType == null) {
				mimeType = MediaType.IMAGE_JPEG.getType();
			}
			response.setContentType(mimeType);
			response.setContentLength((int) exportFile.length());
			String headerValue = String.format("attachment; filename=\"%s\"", exportFile.getName());
			response.setHeader("Content-Disposition", headerValue);
			OutputStream outStream = response.getOutputStream();
			byte[] buffer = new byte[1028];
			int bytesRead = -1;
			while ((bytesRead = inputStream.read(buffer)) != -1) {
				outStream.write(buffer, 0, bytesRead);
			}
			inputStream.close();
			outStream.close();
		} catch (Exception e) {
			try {
				response.sendError(HttpServletResponse.SC_NOT_FOUND);
			} catch (IOException io) {
				log.error("Exception when serving image ", io);
			}
			log.warn(e.getMessage());
		}
	}// End exportFile ()

}// LocalFileSaver()