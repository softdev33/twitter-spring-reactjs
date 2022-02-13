package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class SameFollowerResponse {
    private Long id;
    private String fullName;
    private Map<String, Object> avatar;
}
