package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListsOwnerMemberResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private ImageResponse avatar;
    private boolean isMemberInList;
}
