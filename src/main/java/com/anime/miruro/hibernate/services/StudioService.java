package com.anime.miruro.hibernate.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Studio;
import com.anime.miruro.hibernate.repositories.StudioRepository;
import com.anime.miruro.services.GenericService;

@Service
public class StudioService extends GenericService<Integer,Studio,StudioRepository>{
    
}