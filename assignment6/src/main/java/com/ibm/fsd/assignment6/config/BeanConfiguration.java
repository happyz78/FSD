package com.ibm.fsd.assignment6.config;

import org.h2.server.web.WebServlet;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.captcha.botdetect.web.servlet.SimpleCaptchaServlet;

@Configuration
public class BeanConfiguration implements WebMvcConfigurer {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Bean
    ServletRegistrationBean<WebServlet> h2servletRegistration() {
        ServletRegistrationBean<WebServlet> registrationBean = new ServletRegistrationBean<>(new WebServlet());
        registrationBean.addUrlMappings("/console/*");
        return registrationBean;
    }

    @Bean 
    public ServletRegistrationBean<SimpleCaptchaServlet> captchaServletRegistration () { 
	    ServletRegistrationBean<SimpleCaptchaServlet> srb = new ServletRegistrationBean<>(); 
	    srb.setServlet(new SimpleCaptchaServlet()); 
	    srb.addUrlMappings("/simple-captcha-endpoint"); 
	    return srb; 
    }

    @Bean 
    public ServletContextInitializer initializer() { 
    	return (servletContext -> {
    	  servletContext.setInitParameter("BDC_configFileLocation", "/resources/botdetect.xml");
    	  });
    }
}

