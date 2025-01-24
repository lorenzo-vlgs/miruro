package com.anime.miruro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
   
    // CREATE
    //
    @PostMapping("/save")
    public void save(@RequestBody Genre genre){
        genreService.save(genre);
    }

    // READ 
    //
    @GetMapping("/all")
    public List<Genre> getAll(){
        return genreService.findAll();    
    }

    @GetMapping("/{id}")
    public Genre getById(@PathVariable int id){
        return genreService.findById(id);
    }

    // UPDATE
    //
    @PostMapping("/update")
    public void update(@RequestBody Genre genre) {
        genreService.update(genre);
    }
    
    // DELETE
    //
    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        genreService.delete(id);
    }
}
