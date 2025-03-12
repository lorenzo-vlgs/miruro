package com.anime.miruro.hibernate.controllers;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anime.miruro.hibernate.entities.Status;
import com.anime.miruro.hibernate.services.StatusService;

@RestController
@RequestMapping("/api/status")
public class StatusController {
    
    private StatusService statusService;

    public StatusController(StatusService statusService, ApplicationContext context) {
        this.statusService = statusService;
    }

    @GetMapping("/all")
    public List<Status> getStatuses(){
        return  statusService.findAll(Sort.Direction.ASC, "name"); 
    }
}
