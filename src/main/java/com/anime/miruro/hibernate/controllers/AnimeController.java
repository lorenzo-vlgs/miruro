package com.anime.miruro.hibernate.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.services.AnimeService;


@RestController
@RequestMapping("/api/animes")
public class AnimeController {
    
    private AnimeService animeService;

    private ApplicationContext context;

    public AnimeController() {
    }

    @Autowired
    public AnimeController(AnimeService animeService, ApplicationContext context) {
        this.animeService = animeService;
        this.context = context;
    }

    // CREATE
    //
    @PostMapping("/save")
    public void save(@RequestBody Map<String,Object> animeData){

        Anime anime = context.getBean(Anime.class, animeData);
        animeService.save(anime);
    }

    // READ 
    //
    @GetMapping("/all")
    public List<Anime> getAll(){
        return animeService.findAll(Sort.Direction.ASC, "name");    
    }

    @GetMapping("/{id}")
    public Anime getById(@PathVariable int id){
        return animeService.findById(id);
    }

    // UPDATE
    //
    @PostMapping("/update")
    public void update(@RequestBody Map<String,Object> animeData) {
        Anime anime = context.getBean(Anime.class, animeData);
        animeService.update(anime);
    }
    
    // DELETE
    //
    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        animeService.delete(id);
    }

    /* CUSTOM ENDPOINTS */
    
    // COUNT HOW MANY ANIMES THERE ARE IN THE DB
    //
    @GetMapping("/count")
    public Long getCount() {
        return animeService.getCount();
    }


    // GET THE YEARS IT CAN FIND
    //
    @GetMapping("/years")
    public List<Integer> getYears(){
        return animeService.findYears();
    }
    
    @GetMapping("/trending")
    public List<Anime> getByYearAndSeason(@RequestParam("season") String season, @RequestParam("year") int year){
        return animeService.findByYearAndSeason(season, year);
    }


}
