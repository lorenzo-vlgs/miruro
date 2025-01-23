package com.anime.miruro.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "animes")
@Getter
@Setter
public class Anime {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String image;

    private String name;

    
    public Anime() {}

    public Anime(String image, String name) {
        this.image = image;
        this.name = name;
    }
    
    @OneToOne(mappedBy = "anime", cascade = {CascadeType.ALL})
    private AnimeDetail animeDetail;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "anime_genre",
        joinColumns = @JoinColumn(name = "anime_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres;
        
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "anime_studio",
        joinColumns = @JoinColumn(name = "anime_id"),
        inverseJoinColumns = @JoinColumn(name = "studio_id")
    )
    private Set<Studio> studios;
    
    @OneToMany(mappedBy = "anime", cascade = {CascadeType.ALL})
    private Set<Character> characters;

    // Aggiungi un genere nella lista
    //
    public void add(Genre genre){
        if (this.genres == null) {
            this.genres = new HashSet<>();
        }
        
        this.genres.add(genre);
    }
    
    // Aggiungi uno studio nella lista
    //
    public void add(Studio studio){
        if (this.studios == null) {
            this.studios = new HashSet<>();
        }

        this.studios.add(studio);
    }

    // Aggiungi un personaggio alla lista
    //
    public void add(Character character){
        if (this.characters == null) {
            this.characters = new HashSet<>();
        }

        this.characters.add(character);
    }

    @Override
    public String toString() {
        return "Anime [id=" + id + ", image=" + image + ", name=" + name + "]";
    }
    
    
}
