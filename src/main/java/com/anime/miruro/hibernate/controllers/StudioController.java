package com.anime.miruro.hibernate.controllers;

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

import com.anime.miruro.hibernate.entities.Studio;
import com.anime.miruro.hibernate.services.StudioService;

@RestController
@RequestMapping("api/studios")
public class StudioController {
    
    private StudioService studioService;

    private ApplicationContext context;

    public StudioController() {
    }

    @Autowired
    public StudioController(StudioService studioService, ApplicationContext context) {
        this.studioService = studioService;
        this.context = context;
    }

    // CREATE
    //
    @PostMapping("/save")
    public void save(@RequestBody Map<String,String> studioData){
    
        Studio studio = context.getBean(Studio.class, studioData);
        studioService.save(studio);
    
    }

    // READ 
    //
    @GetMapping("/all")
    public List<Studio> getAll(){
        return studioService.findAll();    
    }

    @GetMapping("/{id}")
    public Studio getById(@PathVariable int id){
        return studioService.findById(id);
    }

    // UPDATE
    //
    @PostMapping("/update")
    public void update(@RequestBody Map<String,String> studioData) {
        Studio studio = context.getBean(Studio.class, studioData);
        studio.setId(Integer.parseInt(studioData.get("id")));

        studioService.update(studio);
    }
    
    // DELETE
    //
    @PostMapping("/delete")
    public void delete(@RequestBody Map<String,String> studioData){
        
        int id = Integer.parseInt(studioData.get("id"));
        studioService.delete(id);
    }

    // GET GENRE COUNT
    //
    @GetMapping("/count")
    public Long getGenreCount() {
        return studioService.getCount();
    }
    
}
