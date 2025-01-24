package com.anime.miruro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.entities.Genre;
import com.anime.miruro.services.GenreService;

@RestController
@RequestMapping("api/genres")
public class GenreController {
    
    private GenreService genreService;

    public GenreController() {
    }

    @Autowired
    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }  
   
    @GetMapping("/all")
    public List<Genre> findAll() {
        return genreService.findAll();
    }
}
