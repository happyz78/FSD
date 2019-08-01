package com.ibm.fsd.assignment5.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ibm.fsd.assignment5.repository.RoleRepository;
import com.ibm.fsd.assignment5.repository.UserRepository;
import com.ibm.fsd.assignment5.model.Role;
import com.ibm.fsd.assignment5.model.User;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setActive(1);
        Role userRole;
        if ("admin".equals(user.getName())) {
            userRole = roleRepository.findByRole("ADMIN");
        } else {
            userRole = roleRepository.findByRole("USER");
        }
        user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
        System.out.println("................................" + user.toString());
        return userRepository.save(user);
    }

	@Override
	public User updateUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String email) {
		User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在");
        }
		Set<Role> list = user.getRoles();
        Collection<GrantedAuthority> grantedAuthorities = null;
    	StringBuilder sb = new StringBuilder();
    	list.stream().forEach(role -> {
    		sb.append(role.getRole() + ",");
    	});
    	grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(sb.toString());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), grantedAuthorities); 
	}
}
