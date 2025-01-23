package com.anime.miruro.entities;

import java.sql.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "anime_details")
@Getter
@Setter
public class AnimeDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int detail;
    
    private String description;

    private int episodes;

    private Date rilascio;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "anime_id")
    private Anime anime;

    
    public AnimeDetail() {
    }

    public AnimeDetail(String description, int episodes, Date rilascio) {
        this.description = description;
        this.episodes = episodes;
        this.rilascio = rilascio;
    }

    @Override
    public String toString() {
        return "AnimeDetail [detail=" + detail + ", description=" + description + ", episodes=" + episodes
                + ", rilascio=" + rilascio + "]";
    }
    
}
