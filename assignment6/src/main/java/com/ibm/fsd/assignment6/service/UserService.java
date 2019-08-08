package com.ibm.fsd.assignment6.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.ibm.fsd.assignment6.model.User;

public interface UserService {

    public User findUserByEmail(String email);
    public User saveUser(User user);
	public User updateUser(User user);
	
	public UserDetails loadUserByUsername(String email);
}
