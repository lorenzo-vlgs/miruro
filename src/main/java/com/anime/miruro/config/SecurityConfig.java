package com.anime.miruro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(aut ->
                aut 
                    .requestMatchers("/css/**", "/img/**").permitAll()
                    .requestMatchers("/js/user/**", "/js/navbar/**", "/js/redirect/**", "/js/api/user/**").permitAll()
                    .requestMatchers("/html/navbar/**", "/html/user/**").permitAll()
                    .requestMatchers("/api/**", "/home/**", "/anime/**", "/trending/**").permitAll()
                    .anyRequest().authenticated() // Require authentication for other endpoints
            )
            .formLogin(form -> 
                form
                    .loginPage("/login.html")
                    .loginProcessingUrl("/login")
                    .failureUrl("/login?error=true") // Redirect to /login with error parameter on failure
                    .permitAll()
            )
            .logout(logout -> 
                logout
                    .permitAll() // Allow everyone to access the logout page
            )
            .csrf(csrf -> csrf.disable()); // Disable CSRF protection

        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager() {
        // Definizione degli utenti
        UserDetails john = User.builder()
            .username("john")
            .password("{noop}test123") // La password non è criptata
            .roles("EMPLOYEE") // Ruolo assegnato
            .build();

        UserDetails mary = User.builder()
            .username("mary")
            .password("{noop}test123")
            .roles("EMPLOYEE", "MANAGER") // Ruoli assegnati
            .build();

        UserDetails susan = User.builder()
            .username("susan")
            .password("{noop}test123")
            .roles("EMPLOYEE", "MANAGER", "ADMIN") // Ruoli assegnati
            .build();

        // Restituzione del bean di gestione degli utenti in memoria
        return new InMemoryUserDetailsManager(john, mary, susan);
    }

}
