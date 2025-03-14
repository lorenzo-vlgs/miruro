package com.anime.miruro.hibernate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.anime.miruro.hibernate.entities.Status;
import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.entities.UserAnime;
import com.anime.miruro.hibernate.entities.UserAnimeId;
import java.util.List;


public interface UserAnimeRepository extends JpaRepository<UserAnime, UserAnimeId>{
    
    List<UserAnime> findByUserAndStatus(User user, Status status);
}
