package com.anime.miruro.controllers.RESTful;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
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

    private ApplicationContext context;

    public GenreController() {
    }

    @Autowired
    public GenreController(GenreService genreService, ApplicationContext context) {
        this.genreService = genreService;
        this.context = context;
    }
    
   
    // CREATE
    //
    @PostMapping("/save")
    public void save(@RequestBody Map<String,String> genreData){

        Genre genre = context.getBean(Genre.class, genreData);
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
    public void update(@RequestBody Map<String,String> genreData) {

        Genre genre = context.getBean(Genre.class, genreData);
        genre.setId(Integer.parseInt(genreData.get("id")));

        genreService.update(genre);
        
    }
    
    // DELETE
    //
    @PostMapping("/delete")
    public void delete(@RequestBody Map<String,String> genreData){
        int id = Integer.parseInt(genreData.get("id"));
        genreService.delete(id);
    }

    // GET GENRE COUNT
    //
    @GetMapping("/count")
    public Long getGenreCount() {
        return genreService.getCount();
    }
    
}
