package com.anime.miruro.hibernate.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Status;
import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.entities.UserAnime;
import com.anime.miruro.hibernate.entities.UserAnimeId;
import com.anime.miruro.hibernate.repositories.UserAnimeRepository;
import com.anime.miruro.services.GenericService;

@Service
public class UserAnimeService extends GenericService<UserAnimeId, UserAnime, UserAnimeRepository>{
    
    public List<UserAnime> findByUserAndStatus(User user, Status status){
        return getRepository().findByUserAndStatus(user, status);
    }
}
