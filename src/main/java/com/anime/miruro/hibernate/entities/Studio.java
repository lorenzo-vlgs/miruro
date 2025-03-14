package com.anime.miruro.hibernate.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "studios")
@Getter
@Setter
public class Studio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String image;

    private String name;

    private String description;
    
    private int dob;

    @ManyToMany(mappedBy = "studios", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonBackReference
    private Set<Anime> anime;

    
    public Studio() {
    }

    public Studio(String image, String name, int dob) {
        this.image = image;
        this.name = name;
        this.dob = dob;
    }

    @Override
    public String toString() {
        return "Studio [id=" + id + ", name=" + name + ", dob=" + dob + "]";
    }

    

}
