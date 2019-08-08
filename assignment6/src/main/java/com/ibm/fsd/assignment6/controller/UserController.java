package com.ibm.fsd.assignment6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.ibm.fsd.assignment6.model.Role;
import com.ibm.fsd.assignment6.model.User;
import com.ibm.fsd.assignment6.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpServletRequest request;
    
    @Autowired
    private HttpServletResponse response;

//    @Autowired
//    private SessionRegistry sessionRegistry;
    
    @RequestMapping(value={"/", "/login"}, method = RequestMethod.GET)
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }


    @RequestMapping(value="/registration", method = RequestMethod.GET)
    public ModelAndView registration(){
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        modelAndView.addObject("user", user);
        modelAndView.setViewName("registration");
        return modelAndView;
    }
    

    @RequestMapping(value="/access-denied", method = RequestMethod.GET)
    public ModelAndView accessDenied(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("access-denied");
        return modelAndView;
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        User userExists = userService.findUserByEmail(user.getEmail());
        if (userExists != null) {
            bindingResult
                    .rejectValue("email", "error.user",
                            "There is already a user registered with the email provided");
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("registration");
        } else {
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User has been registered successfully");
            modelAndView.addObject("user", new User());
            modelAndView.setViewName("registration");

        }
        return modelAndView;
    }

    @RequestMapping(value="/index", method = RequestMethod.GET)
    public ModelAndView index(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        Set<Role> list = user.getRoles();
        Optional<Role> adminRole = list.stream().filter(role -> {
        	return "admin".equalsIgnoreCase(role.getRole());
        }).findFirst();
        
        if (adminRole.isPresent()) {
            modelAndView.addObject("admin", true);
        }
        modelAndView.setViewName("index");
        return modelAndView;
    }

    @RequestMapping(value="/admin/adminHome", method = RequestMethod.GET)
    public ModelAndView home(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        modelAndView.addObject("userName", "Welcome " + user.getName() + " " + user.getLastName() + " (" + user.getEmail() + ")");
        modelAndView.addObject("adminMessage","This Page is available to Users with Admin Role");
        modelAndView.setViewName("admin/adminHome");
        return modelAndView;
    }

    @RequestMapping(value="/user/userHome", method = RequestMethod.GET)
    public ModelAndView user(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        modelAndView.addObject("user",user);
        modelAndView.setViewName("user/userHome");
        return modelAndView;
    }
    
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ModelAndView update(@Valid User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!auth.getName().equals(user.getEmail())) {
            User userExists = userService.findUserByEmail(user.getEmail());
            if (userExists != null) {
                bindingResult
                        .rejectValue("email", "error.user",
                                "There is already a user registered with the email provided");
            }
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("user/userHome");
            return modelAndView;
        }
        
        User currentUser = userService.findUserByEmail(auth.getName());
        user.setId(currentUser.getId());
        user.setRoles(currentUser.getRoles());
        String originalPassword = user.getPassword();
        user = userService.updateUser(user);

        UserDetails userDetails = userService.loadUserByUsername(user.getEmail()); 
        
        List<GrantedAuthority> updatedAuthorities = new ArrayList<>(auth.getAuthorities());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(userDetails, originalPassword, updatedAuthorities);

        SecurityContextHolder.getContext().setAuthentication(newAuth);
        modelAndView.addObject("successMessage", "User has been updated successfully! Please relogin!");
        modelAndView.addObject("user", user);
        modelAndView.setViewName("user/userHome");
        return modelAndView;
    }
}
