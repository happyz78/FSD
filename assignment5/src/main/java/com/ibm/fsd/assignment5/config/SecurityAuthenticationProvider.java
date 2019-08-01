package com.ibm.fsd.assignment5.config;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.ibm.fsd.assignment5.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SecurityAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		log.error("in the SecurityAuthenticationProvider!" + authentication);
        String userName = authentication.getName();// 这个获取表单输入中的用户名
        String password = (String) authentication.getCredentials();// 这个是表单中输入的密码
 
        /** 判断用户是否存在 */
        UserDetails userDetails = userService.loadUserByUsername(userName); 
        if (userDetails == null) {
            throw new UsernameNotFoundException("用户不存在");
        }

		log.error("in the SecurityAuthenticationProvider2!" + password);
		log.error("in the SecurityAuthenticationProvider2!" + userDetails.getPassword());
        /** 判断密码是否正确 */
        if (!bCryptPasswordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("密码不正确");
        }

        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
		log.error("in the SecurityAuthenticationProvider2!" + authorities);
        return new UsernamePasswordAuthenticationToken(userDetails, password, authorities);// 构建返回的用户登录成功的token

	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
