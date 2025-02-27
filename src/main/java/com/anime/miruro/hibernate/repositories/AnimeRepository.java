package com.anime.miruro.hibernate.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.anime.miruro.hibernate.entities.Anime;


public interface AnimeRepository extends JpaRepository<Anime,Integer>{

    @Query("SELECT YEAR(a.rilascio) FROM Anime a GROUP BY YEAR(a.rilascio) ORDER BY YEAR(a.rilascio) DESC")
    List<Integer> findYears();
    
    @Query("SELECT a FROM Anime a WHERE month(a.rilascio) BETWEEN :start AND :end AND year(a.rilascio) = :year")
    List<Anime> findBySeasonAndYear(@Param("start") int start, 
                                @Param("end") int end, 
                                @Param("year") int year);

}
