package com.anime.miruro.hibernate.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.hibernate.entities.Status;
import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.entities.UserAnime;
import com.anime.miruro.hibernate.services.StatusService;
import com.anime.miruro.hibernate.services.UserAnimeService;
import com.anime.miruro.hibernate.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/user-anime")
@RequiredArgsConstructor
public class UserAnimeController {
    
    private final ApplicationContext context;
    private final UserAnimeService userAnimeService;
    private final UserService userService;
    private final StatusService statusService;

    @GetMapping("/search")
    public List<UserAnime> findByUserAndStatus(@CurrentSecurityContext(expression="authentication?.name") String username, @RequestParam("statusId") int statusId) {

        User user = userService.findByUsername(username);
        Status status = statusService.findById(statusId);
        
        return userAnimeService.findByUserAndStatus(user,status);
    }

    @PostMapping("/save")
    public void create(@RequestBody Map<String,String> data, @CurrentSecurityContext(expression="authentication?.name") String username) {

        data.put("username", username);
        UserAnime userAnime = context.getBean(UserAnime.class, data);
        userAnimeService.save(userAnime);
        
    }
    

}
