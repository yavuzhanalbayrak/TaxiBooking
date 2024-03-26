package com.taxi.backend.service;

import com.taxi.backend.dao.request.SignUpRequest;
import com.taxi.backend.dao.request.SigninRequest;
import com.taxi.backend.dao.response.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);
}
