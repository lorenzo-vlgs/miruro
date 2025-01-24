package com.anime.miruro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.entities.Anime;
import com.anime.miruro.services.AnimeService;

@RestController
@RequestMapping("api/animes")
public class AnimeController {
    
    private AnimeService animeService;

    public AnimeController() {
    }

    @Autowired
    public AnimeController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @GetMapping("/all")
    public List<Anime> getAll(){
        return animeService.findAll();    
    }
}
