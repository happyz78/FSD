package com.ibm.fsd.assignment6.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.captcha.botdetect.web.servlet.SimpleCaptcha;
import com.ibm.fsd.assignment6.model.Captcha;

@RestController
@RequestMapping("/capthca")
public class CaptchaController {
	@Autowired
	HttpServletRequest request;

	@PostMapping("/validation")
	public String validation(@RequestBody Captcha captcha) {
	    // create a captcha instance to be used for the captcha validation 
	    SimpleCaptcha yourFirstCaptcha = SimpleCaptcha.load(request, "registrationCaptchaStyle"); 
	    // execute the captcha validation 
	    boolean isHuman = yourFirstCaptcha.validate(captcha.getUserEnteredCaptchaCode(), captcha.getCaptchaId()); 
	    if (isHuman) { 
	    	return "success";
	    } else { 
	    	return "failure";
	    } 
	}
}
