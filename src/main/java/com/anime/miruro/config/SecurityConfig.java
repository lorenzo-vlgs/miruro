package com.anime.miruro.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(aut ->
                aut 
                    .requestMatchers("/css/**", "/img/**").permitAll()
                    .requestMatchers("/js/user/**", "/js/navbar/**", "/js/redirect.js", "/js/api/user/**", "/js/register.js").permitAll()
                    .requestMatchers("/html/navbar/**", "/html/user/**").permitAll()
                    .requestMatchers("/register.html", "/sign-up").permitAll()
                    .requestMatchers("/api/**", "/home/**", "/anime/**", "/trending/**").permitAll()
                    .anyRequest().authenticated() // Require authentication for other endpoints
            )
            .formLogin(form -> 
                form
                    .loginPage("/login.html")
                    .loginProcessingUrl("/login")
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
    public UserDetailsService userDetailsService(DataSource dataSource) {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager();
        userDetailsManager.setDataSource(dataSource);

        // Definisci le query per caricare gli utenti e i ruoli
        userDetailsManager.setUsersByUsernameQuery("SELECT username, password, enabled FROM users WHERE username = ?");
        userDetailsManager.setAuthoritiesByUsernameQuery("SELECT username, ruolo FROM roles WHERE username = ?");

        return userDetailsManager;
    }

    /*
     
    @Bean
    public InMemoryUserDetailsManager userDetailsManager() {
        // Definizione degli utenti
        UserDetails john = User.builder()
            .username("john")
            .password("{noop}test123") // La password non è criptata
            .build();

        // Restituzione del bean di gestione degli utenti in memoria
        return new InMemoryUserDetailsManager(john);
    }

    */

}
