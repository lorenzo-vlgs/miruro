package com.anime.miruro.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class AppController {


    //
    // USER SIGN IN - SIGN UP ENDPOINTS 
    //
    @GetMapping("/sign-up")
    public String getSignUp(){
        return "/register.html";
    }
    //
    // HOMEPAGE ENDPOINTS
    //
    @GetMapping("/")
    public String root(){
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String getHomepage(){
        return "html/user/homepage.html";
    }

    //
    // ANIME RELATED ENDPOINTS
    //
    @GetMapping("/anime")
    public String getAnimeDetail() {
        return "html/user/anime-detail.html";
    }

    @GetMapping("/trending")
    public String getTrending() {
        return "/html/trending.html";
    }
    
    //
    // ADMIN RELATED ENDPOINTS
    //
    @GetMapping("/admin")
    public String getAdmin() {
        return "/html/admin/admin.html";
    }

    @GetMapping("/admin/genres")
    public String getGenresAdmin() {
        return "/html/admin/admin-genre.html";
    }

    @GetMapping("/admin/studios")
    public String getStudiosAdmin(){
        return "/html/admin/admin-studio.html";
    }
    
    @GetMapping("/admin/studios/form")
    public String getStudiosForm(){
        return "/html/admin/admin-studio-form.html";
    }

    @GetMapping("/admin/characters")
    public String geCharacters() {
        return "/html/admin/admin-character.html";
    }
    
    @GetMapping("/admin/characters/form")
    public String geCharactersForm() {
        return "/html/admin/admin-character-form.html";
    }
}
