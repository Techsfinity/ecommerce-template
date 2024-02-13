package com.osanda.spring.modules.workflow.job;

import java.security.Principal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.TimeZone;

import org.springframework.stereotype.Service;

import com.osanda.spring.modules.workflow.comment.Comment;
import com.osanda.spring.modules.workflow.customer.Customer;
import com.osanda.spring.modules.workflow.customer.CustomerRepository;
import com.osanda.spring.modules.workflow.job.dto.JobSaveDto;
import com.osanda.spring.modules.workflow.job.status.JobStatus;
import com.osanda.spring.modules.workflow.job.status.JobStatusRepository;
import com.osanda.spring.modules.workflow.job.type.JobType;
import com.osanda.spring.modules.workflow.job.type.JobTypeRepository;
import com.osanda.spring.modules.workflow.product.ProductRepository;
import com.osanda.spring.modules.workflow.selectProduct.SelectProduct;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

	private final JobRepository jobRepository;
	private final ProductRepository productRepository;
	private final JobTypeRepository jobTypeRepository;
	private final JobStatusRepository jobStatusRepository;
	private final CustomerRepository customerRepository;

	DateFormat UTCFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

	/***
	 * save process job
	 * 
	 * @author Osanda Wedamualla
	 * 
	 * @param jobDto
	 * @param principal
	 * @return
	 */
	public Job saveJob(JobSaveDto jobDto, Principal principal) {

		Job job = new Job();

		job.setName(jobDto.getName());

		if (jobDto.getJobType() != null && !jobDto.getJobType().equals("")) {
			JobType type = this.jobTypeRepository.findByName(jobDto.getJobType());
			job.setType(type);
		}

		JobStatus status = this.jobStatusRepository.findByName("Pending");
		job.setStatus(status);

		if (jobDto.getCustomerName() != null && jobDto.getCustomerPhone() != null) {

			Customer cus = this.customerRepository.findByPhone(jobDto.getCustomerPhone());

			if (cus == null) {
				Customer cutomer = new Customer();
				cutomer.setName(jobDto.getCustomerName());
				cutomer.setPhone(jobDto.getCustomerPhone());

				this.customerRepository.save(cutomer);
				log.info("New customer added {} : {}", cutomer.getName(), cutomer.getPhone());

				job.setCustomer(cutomer);

			} else {
				job.setCustomer(cus);
			}

		}

		String userName = null;
		if (principal != null) {
			userName = principal.getName();
		}

		if (jobDto.getComment() != null) {
			Comment comment = new Comment();
			comment.setDescription(jobDto.getComment());
			comment.setUserName(userName);

			log.info("New comment added : " + userName);
			job.setComments(Arrays.asList(comment));
		}

		if (jobDto.getProducts() != null && jobDto.getProducts().size() > 0) {

			Set<SelectProduct> products = new HashSet<>();

			jobDto.getProducts().stream().filter(p -> (p.getName() != null)).forEach(pro -> {
				SelectProduct product = new SelectProduct();
				product.setQuantity(pro.getQuantity());
				product.setProduct(this.productRepository.findByName(pro.getName()));

				products.add(product);
			});

			log.info("Selected products saved : " + products.size());
			job.setSelectProducts(products);
		}

		if (jobDto.getEndDate() != null) {

			Date endDate = null;

			try {
				UTCFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
				endDate = UTCFormat.parse(jobDto.getEndDate());
			} catch (ParseException e) {
				e.printStackTrace();
			}

			job.setEndDate(endDate);
		}

		job.setRemarks(jobDto.getRemarks());

		job.setTotal(jobDto.getSubTotal());
		job.setExtraCost(jobDto.getExtraCost());
		job.setAdvance(jobDto.getAdvance());
		job.setExtraCostName(jobDto.getExtraCostName());

		this.jobRepository.save(job);
		log.info("JobSave saved sucessfully");

		return job;

	}

	/***
	 * update only relevant job details
	 * 
	 * @author Osanda Wedamulla
	 * 
	 * @param jobDto
	 * @param principal
	 * @return
	 */
	public Job updateJob(JobSaveDto jobDto, Principal principal) {

		Optional<Job> jobOpt = this.jobRepository.findById(jobDto.getId());

		if (jobOpt.isPresent()) {

			Job job = jobOpt.get();

			job.setName(jobDto.getName());

			if (jobDto.getJobType() != null && !jobDto.getJobType().equals("")) {
				JobType type = this.jobTypeRepository.findByName(jobDto.getJobType());
				job.setType(type);
			}

			if (jobDto.getCustomerName() != null && jobDto.getCustomerPhone() != null) {

				Customer cus = this.customerRepository.findByPhone(jobDto.getCustomerPhone());

				if (cus == null) {
					Customer cutomer = new Customer();
					cutomer.setName(jobDto.getCustomerName());
					cutomer.setPhone(jobDto.getCustomerPhone());

					this.customerRepository.save(cutomer);
					log.info("New customer added {} : {}", cutomer.getName(), cutomer.getPhone());

					job.setCustomer(cutomer);

				} else {
					job.setCustomer(cus);
				}

			}

			if (jobDto.getProducts() != null && jobDto.getProducts().size() > 0) {

				Set<SelectProduct> products = new HashSet<>();

				jobDto.getProducts().stream().filter(p -> (p.getName() != null)).forEach(pro -> {
					SelectProduct product = new SelectProduct();
					product.setQuantity(pro.getQuantity());
					product.setProduct(this.productRepository.findByName(pro.getName()));

					products.add(product);
				});

				log.info("Selected products saved : " + products.size());
				job.setSelectProducts(products);
			}

			if (jobDto.getEndDate() != null) {

				Date endDate = null;

				try {
					UTCFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
					endDate = UTCFormat.parse(jobDto.getEndDate());
				} catch (ParseException e) {
					e.printStackTrace();
				}

				job.setEndDate(endDate);
			}

			job.setRemarks(jobDto.getRemarks());

			job.setTotal(jobDto.getSubTotal());
			job.setExtraCost(jobDto.getExtraCost());
			job.setExtraCostName(jobDto.getExtraCostName());
			job.setAdvance(jobDto.getAdvance());

			this.jobRepository.save(job);
			log.info("Job details updated successfully : " + job.getId());

			return job;

		}

		return null;
	}// saveJob()

}// JobService()
