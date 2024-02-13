package com.osanda.spring.core.user;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.osanda.spring.core.AbstractAuditingEntity;
import com.osanda.spring.core.role.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Audited
@NoArgsConstructor
@Table(name = "user")
@EntityListeners(AuditingEntityListener.class)
public class User extends AbstractAuditingEntity {

	private static final long serialVersionUID = 2284741982266238175L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Size(min = 1, max = 50)
	@Column(length = 50, unique = true, nullable = true)
	private String userName;

	@Email
	@NotNull
	@Column(length = 200, unique = true, nullable = false)
	private String email;

	private String firstName;
	private String lastName;
	private String mobile;

	private Boolean active;

	@Column(length = 200, nullable = false)
	private String password;

	@NotAudited
	@ManyToMany(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = {
			@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = true) }, inverseJoinColumns = {
					@JoinColumn(name = "role_id", referencedColumnName = "id", nullable = true) })
	private Set<Role> roles = new HashSet<>();

	@PrePersist
	private void encriptPassword() {
		this.password = new BCryptPasswordEncoder().encode(this.password);
	}

}
