package com.anime.miruro.hibernate.services;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Status;
import com.anime.miruro.hibernate.repositories.StatusRepository;
import com.anime.miruro.services.GenericService;

@Service
public class StatusService extends GenericService<Integer,Status,StatusRepository>{

}