package com.anime.miruro.hibernate.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Genre;
import com.anime.miruro.hibernate.repositories.GenreRepository;
import com.anime.miruro.services.GenericService;

@Service
public class GenreService extends GenericService<Integer,Genre, GenreRepository>{

}
