package com.anime.miruro.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.entities.User;
import com.anime.miruro.repositories.UserRepository;

@Service
public class UserService extends GenericService<Integer,User,UserRepository>{
    
}
