package com.ibm.fsd.assignment6.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("securityAuthenticationFailHandler")
public class SecurityAuthenticationFailHandler extends SimpleUrlAuthenticationFailureHandler {
     
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        log.debug("error is:" + exception.getMessage());
        /** 跳转到指定页面 */
        String redirectUrl = "/login?error=true";
        new DefaultRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
