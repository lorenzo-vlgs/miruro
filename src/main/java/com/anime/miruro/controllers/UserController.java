package com.anime.miruro.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.entities.User;
import com.anime.miruro.services.UserService;

@RestController
@RequestMapping("api/users")
public class UserController {
    
    private UserService userService;

    public UserController() {
    }

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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

        User user = new User();
        user.setUsername(userData.get("username"));
        user.setPassword(userData.get("password"));
        user.setEnabled(Boolean.parseBoolean(userData.get("enabled")));
        userService.save(user);
    }

    @PostMapping("/update")
    public void update(@RequestBody Map<String,String> userData) {

        User user = new User();
        user.setId(Integer.parseInt(userData.get("id")));
        user.setUsername(userData.get("username"));
        user.setPassword(userData.get("password"));
        user.setEnabled(Boolean.parseBoolean(userData.get("enabled")));

        userService.save(user);
    }

    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        userService.delete(id);
    }
}
