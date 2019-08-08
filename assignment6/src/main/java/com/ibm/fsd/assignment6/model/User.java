package com.ibm.fsd.assignment6.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USER")
@SequenceGenerator(name="USER_ID_SEQ", initialValue=2, allocationSize=100)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="USER_ID_SEQ")
    @Column(name = "USER_ID")
    private int id;
    @Column(name = "EMAIL")
    @Email(message = "*Please provide a valid Email")
    @NotEmpty(message = "*Please provide an email")
    private String email;
    @Column(name = "PASSWORD")
    @Length(min = 5, message = "*Your password must have at least 5 characters")
    @NotEmpty(message = "*Please provide your password")
    private String password;
    @Column(name = "NAME")
    @NotEmpty(message = "*Please provide your name")
    private String name;
    @Column(name = "LAST_NAME")
    //@NotEmpty(message = "*Please provide your last name")
    private String lastName;
    @Column(name = "ACTIVE")
    private int active;
    @ManyToMany(cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    @JoinTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<Role> roles;

}