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

import com.anime.miruro.entities.Studio;
import com.anime.miruro.services.StudioService;

@RestController
@RequestMapping("api/studios")
public class StudioController {
    
    private StudioService studioService;

    public StudioController() {
    }

    @Autowired
    public StudioController(StudioService studioService) {
        this.studioService = studioService;
    }

    // CREATE
    //
    @PostMapping("/save")
    public void save(@RequestBody Map<String,String> studioData){
        Studio studio = new Studio();

        studio.setName(studioData.get("name"));
        studio.setImage(studioData.get("image"));
        studio.setDescription(studioData.get("description"));
        studio.setDob(Integer.parseInt(studioData.get("dob")));
        
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
    public void update(@RequestBody Studio studio) {
        studioService.update(studio);
    }
    
    // DELETE
    //
    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        studioService.delete(id);
    }

    // GET GENRE COUNT
    //
    @GetMapping("/count")
    public Long getGenreCount() {
        return studioService.getCount();
    }
    
}
