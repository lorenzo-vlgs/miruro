package com.anime.miruro.hibernate.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.User;
import com.anime.miruro.hibernate.repositories.UserRepository;
import com.anime.miruro.services.GenericService;

@Service
public class UserService extends GenericService<Integer,User,UserRepository>{
    
    public User findByUsername(String username){
        return getRepository().findByUsername(username);
    }
}
