package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection;

import lombok.Data;

@Data
public class AuthenticationProjectionResponse {
    private AuthUserProjectionResponse user;
    private String token;
}
