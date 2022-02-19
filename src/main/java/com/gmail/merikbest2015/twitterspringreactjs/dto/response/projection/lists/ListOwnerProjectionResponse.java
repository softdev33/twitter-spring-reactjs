package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListOwnerProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private ImageProjectionResponse avatar;
}
