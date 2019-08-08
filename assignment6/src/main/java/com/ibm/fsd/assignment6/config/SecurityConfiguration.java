package com.ibm.fsd.assignment6.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	
    @Autowired
    private AuthenticationProvider provider;
    @Autowired
    private AuthenticationSuccessHandler securityAuthenticationSuccessHandler;
    @Autowired
    private AuthenticationFailureHandler securityAuthenticationFailHandler;
    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.authenticationProvider(provider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http	
		        .formLogin().loginPage("/login").loginProcessingUrl("/login")
		        .successHandler(securityAuthenticationSuccessHandler)
		        .failureHandler(securityAuthenticationFailHandler)
		        .usernameParameter("email")
		        .passwordParameter("password")
		        .permitAll()  // 登录页面链接、登录表单链接、登录失败页面链接配置
		        .and()
		        .authorizeRequests()
        		.antMatchers("/").permitAll()
        		.antMatchers("/login").permitAll()
        		.antMatchers("/registration").permitAll()
        		.antMatchers("/access-denied").permitAll()
        		.antMatchers("/capthca/**").permitAll()
        		.antMatchers("/simple-captcha-endpoint").permitAll()
        		.antMatchers("/admin/**").hasAuthority("ADMIN")
		        .anyRequest().authenticated()
		        .and()
		        .csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {

        web.ignoring()
                .antMatchers("/css/**", "/js/**", "/images/**", "/console/**");
    }
    
    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}