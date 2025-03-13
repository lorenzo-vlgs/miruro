package com.anime.miruro.hibernate.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.hibernate.entities.UserAnime;
import com.anime.miruro.hibernate.services.UserAnimeService;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/user-anime")
public class UserAnimeController {
    
    private ApplicationContext context;
    private UserAnimeService userAnimeService;

    

    public UserAnimeController(ApplicationContext context, UserAnimeService userAnimeService) {
        this.context = context;
        this.userAnimeService = userAnimeService;
    }



    @PostMapping("/save")
    public void create(@RequestBody Map<String,String> data, @CurrentSecurityContext(expression="authentication?.name") String username) {

        data.put("username", username);
        UserAnime userAnime = context.getBean(UserAnime.class, data);
        userAnimeService.save(userAnime);
        
    }
    

}
