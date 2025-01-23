package com.anime.miruro.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "characters")
@Getter
@Setter
public class Character {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String role;

    @ManyToOne
    @JoinColumn(name = "anime_id")
    private Anime anime;

    public Character(String name, String role) {
        this.name = name;
        this.role = role;
    }

    @Override
    public String toString() {
        return "Character [id=" + id + ", name=" + name + ", role=" + role + "]";
    }

    
    
}
