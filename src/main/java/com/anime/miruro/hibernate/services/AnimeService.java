package com.anime.miruro.hibernate.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.anime.miruro.hibernate.entities.Anime;
import com.anime.miruro.hibernate.entities.Genre;
import com.anime.miruro.hibernate.repositories.AnimeRepository;
import com.anime.miruro.services.GenericService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnimeService extends GenericService<Integer, Anime, AnimeRepository>{
    
    private final GenreService genreService;

    public List<Integer> findYears(){
        return getRepository().findYears();
    }


    public List<Anime> findByYearAndSeason(String season, int year){

        int start;
        int end;

        switch (season.toLowerCase()) {
            case "winter":
                start = 1; // January
                end = 3;   // March
                break;
            case "spring":
                start = 4; // April
                end = 6;   // June
                break;
            case "summer":
                start = 7; // July
                end = 9;   // September
                break;
            case "fall":
                start = 10; // October
                end = 12;   // December
                break;
            default:
                start = 1;
                end = 12;
                break;
        }


        return getRepository().findBySeasonAndYear(start, end, year); 
    }

    public List<Anime> findByGenre(int genreId){
        Genre genre = genreService.findById(genreId);
        return getRepository().findByGenresContains(genre);
    }

}
