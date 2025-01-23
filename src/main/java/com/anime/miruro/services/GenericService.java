package com.anime.miruro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.transaction.Transactional;

public abstract class GenericService<I, E, D extends JpaRepository<E,I>> {
    
    @Autowired
    private D repository;

    @Transactional
    void save(E e) {
        repository.save(e);
    }

    List<E> findAll(){
        return repository.findAll();    
    }

    E findById(I id){
        return repository.findById(id).get();
    }

    @Transactional
    void update(E e){
        repository.save(e);
    }

    @Transactional
    void delete(I id){
        repository.deleteById(id);
    }
}
