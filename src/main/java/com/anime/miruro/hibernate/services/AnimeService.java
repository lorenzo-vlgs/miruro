package com.anime.miruro.hibernate.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.repositories.AnimeRepository;
import com.anime.miruro.services.GenericService;

@Service
public class AnimeService extends GenericService<Integer, Anime, AnimeRepository>{
    
}
