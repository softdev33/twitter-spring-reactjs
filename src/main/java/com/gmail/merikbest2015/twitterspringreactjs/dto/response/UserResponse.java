package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String countryCode;
    private Long phone;
    private String country;
    private String gender;
    private String language;
    private String birthday;
    private LocalDateTime registrationDate;
    private String activationCode;
    private String passwordResetCode;
    private String role;
    private Long tweetCount;
    private Long mediaTweetCount;
    private Long likeCount;
    private Long notificationsCount;
    private boolean active;
    private boolean profileCustomized;
    private boolean profileStarted;
    private boolean mutedDirectMessages;
    private boolean privateProfile;
    private BackgroundColorType backgroundColor;
    private ColorSchemeType colorScheme;
    private List<TweetResponseCommon> tweets;
    private TweetResponseCommon pinnedTweet;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
//    private List<LikeTweetResponse> likedTweets;
//    private List<RetweetResponse> retweets;
    private List<BookmarkResponse> bookmarks;
//    private List<NotificationResponse> notifications;
//    private List<ListsResponse> userLists;
//    private List<ChatParticipantResponse> chats;
    private List<ChatMessageResponse> unreadMessages;
    private List<UserResponseCommon> userMutedList;
    private List<UserResponseCommon> userBlockedList;
    private List<UserResponseCommon> followers;
    private List<UserResponseCommon> following;
    private List<UserResponseCommon> followerRequests;
    private List<UserResponseCommon> subscribers;
}
