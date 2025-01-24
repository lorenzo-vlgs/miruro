package com.anime.miruro.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.entities.Genre;
import com.anime.miruro.repositories.GenreRepository;

@Service
public class GenreService extends GenericService<Integer,Genre, GenreRepository>{
    
}
