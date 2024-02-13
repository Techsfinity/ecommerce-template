package com.osanda.spring.modules.workflow;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.stereotype.Service;

import com.hrandika.spring.silvers.entitymeta.ModelService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkflowService {

	private final RepositoryRestMvcConfiguration restMvcConfiguration;

	//@PostConstruct
	public void createJsonFile() throws IOException {
		File cur = new File("");
		String path = cur.getAbsoluteFile().getParentFile().getAbsolutePath();
		String modelFilePath = path + "/tusker/src/main/webapp/src/assets/json/models.json";

		File modelFile = new File(modelFilePath);
		File parentFile = modelFile.getParentFile();
		if (!parentFile.exists()) {
			parentFile.mkdirs();
		}
		if (!modelFile.exists()) {
			modelFile.createNewFile();
		}
		new ModelService().onPostConstruct(restMvcConfiguration, modelFilePath);
	}

}
