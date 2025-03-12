package com.anime.miruro.hibernate.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.entities.Status;
import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.entities.UserAnime;
import com.anime.miruro.hibernate.services.AnimeService;
import com.anime.miruro.hibernate.services.StatusService;
import com.anime.miruro.hibernate.services.UserAnimeService;
import com.anime.miruro.hibernate.services.UserService;

import java.sql.Date;
import java.util.Map;

import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/user-anime")
public class UserAnimeController {
    
    private UserAnimeService userAnimeService;
    private UserService userService;
    private AnimeService animeService;
    private StatusService statusService;

    public UserAnimeController(UserAnimeService userAnimeService, UserService userService, AnimeService animeService,
            StatusService statusService) {
        this.userAnimeService = userAnimeService;
        this.userService = userService;
        this.animeService = animeService;
        this.statusService = statusService;
    }

    @PostMapping("/save")
    public void create(@RequestBody Map<String,String> data, @CurrentSecurityContext(expression="authentication?.name") String username) {
        
        User user = userService.findByUsername(username);
        Anime anime = animeService.findById(Integer.parseInt(data.get("id")));
        Status status = statusService.findById(Integer.parseInt(data.get("status")));

        UserAnime userAnime = new UserAnime();
        userAnime.setUser(user);
        userAnime.setAnime(anime);

        userAnime.setStatus(status);
        userAnime.setStartDate(Date.valueOf(data.get("start")));
        userAnime.setEndDate(Date.valueOf(data.get("end")));

        userAnimeService.save(userAnime);
    }
    

}
