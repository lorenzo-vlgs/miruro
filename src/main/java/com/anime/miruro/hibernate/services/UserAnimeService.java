package com.anime.miruro.hibernate.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.UserAnime;
import com.anime.miruro.hibernate.entities.UserAnimeId;
import com.anime.miruro.hibernate.repositories.UserAnimeRepository;
import com.anime.miruro.services.GenericService;

@Service
public class UserAnimeService extends GenericService<UserAnimeId, UserAnime, UserAnimeRepository>{
    
}
