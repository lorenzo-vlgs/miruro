package com.anime.miruro.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/all")
    public List<Studio> findAll(){
        return studioService.findAll();
    }
    
}
