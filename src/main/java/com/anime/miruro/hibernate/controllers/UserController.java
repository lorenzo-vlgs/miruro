package com.anime.miruro.hibernate.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.services.UserService;

@RestController
@RequestMapping("api/users")
public class UserController {
    
    private UserService userService;
    private ApplicationContext context;

    public UserController() {
    }

    @Autowired
    public UserController(UserService userService, ApplicationContext context) {
        this.userService = userService;
        this.context = context;
    }

    @GetMapping("/all")
    public List<User> findAll(){
        return userService.findAll();
    }
    
    @GetMapping("/{id}")
    public User findById(@PathVariable int id){
        return userService.findById(id);
    }

    @PostMapping("/save")
    public void save(@RequestBody Map<String,String> userData) {

        User user = context.getBean(User.class, userData);
        userService.save(user);
    }

    @PostMapping("/update")
    public void update(@RequestBody Map<String,String> userData) {

        User user = context.getBean(User.class, userData);
        user.setId(Integer.parseInt(userData.get("id")));

        userService.save(user);
    }

    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        userService.delete(id);
    }

    @GetMapping("/username")
    public User hello(@CurrentSecurityContext(expression="authentication?.name") String username) {
        
        User user = userService.findByUsername(username);
        return user;
    }

}
