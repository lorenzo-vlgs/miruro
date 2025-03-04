package com.anime.miruro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

import jakarta.transaction.Transactional;
import lombok.Getter;

@Getter
public abstract class GenericService<I, E, D extends JpaRepository<E,I>> {
    
    @Autowired
    private D repository;

    @Transactional
    public void save(E e) {
        repository.save(e);
    }

    public List<E> findAll(Direction direction, String column){
        return repository.findAll(Sort.by(direction, column));    
    }

    public List<E> findAll(Pageable pageable) {
        return repository.findAll(pageable).getContent();
    }

    public List<E> findAll(){
        return repository.findAll();    
    }

    public E findById(I id){
        return repository.findById(id).get();
    }

    @Transactional
    public void update(E e){
        repository.save(e);
    }

    @Transactional
    public void delete(I id){
        repository.deleteById(id);
    }

    public Long getCount(){
        return repository.count();
    }

}
