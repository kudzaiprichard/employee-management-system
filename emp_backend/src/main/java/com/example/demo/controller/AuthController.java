package com.example.demo.controller;

import com.example.demo.requestResponse.AuthenticateRequest;
import com.example.demo.requestResponse.AuthenticationResponse;
import com.example.demo.requestResponse.LoggedUserResponse;
import com.example.demo.requestResponse.RegisterRequest;
import com.example.demo.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @GetMapping("/user")
    public ResponseEntity<LoggedUserResponse> getLoggedInUser(HttpServletRequest request){
        return ResponseEntity.ok(this.authService.fetchLoggedInUserByToken(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.created(URI.create("")).body(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticateRequest request
    ){
        return ResponseEntity.accepted()
                .body(authService.authenticate(request));
    }

    @PostMapping("/refreshToken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response

    ) throws IOException {
        authService.refreshToken(request, response);
    }
}

