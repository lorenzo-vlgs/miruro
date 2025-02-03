package com.anime.miruro.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    //
    // AUTHORIZATION ENDPOINTS
    //
    @GetMapping("/login")
    public String getLogin(){
        return "login.html";
    }
}
