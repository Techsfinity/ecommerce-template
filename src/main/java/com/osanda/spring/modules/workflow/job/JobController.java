package com.osanda.spring.modules.workflow.job;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osanda.spring.modules.workflow.job.dto.JobSaveDto;
import com.osanda.spring.utils.ResponseMessage;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${spring.data.rest.base-path}/jobs/")
public class JobController {

	private final JobService jobService;

	@PostMapping(value = "save")
	public ResponseEntity<?> saveJob(@RequestBody JobSaveDto job, Principal principal) {

		Job saveJob = this.jobService.saveJob(job, principal);

		if (saveJob != null) {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(ResponseMessage.createMessage("Job Created " + saveJob.getId()));
		}

		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Error creating job !!");
	}// saveJob()

	@PatchMapping(value = "update")
	public ResponseEntity<?> updateJobDetails(@RequestBody JobSaveDto job, Principal principal) {

		Job saveJob = this.jobService.updateJob(job, principal);

		if (saveJob != null) {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(ResponseMessage.createMessage("Job Updated " + saveJob.getId()));
		}

		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Error updating job details.");
	}// updateJobDetails()

}// JobController()
