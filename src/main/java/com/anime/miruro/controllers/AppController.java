package com.anime.miruro.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {

    @GetMapping("/")
    public String root(){
        return "redirect:/homepage";
    }

    @GetMapping("/homepage")
    public String homepage(){
        return "html/homepage.html";
    }
}
