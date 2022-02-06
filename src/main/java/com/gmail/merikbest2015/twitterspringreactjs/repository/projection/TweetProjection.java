package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;

public interface TweetProjection {
    Long getId();
    String getText();
    LocalDateTime getDateTime();
    LocalDateTime getScheduledDate();
    String getAddressedUsername();
    Long getAddressedId();
    Long getAddressedTweetId();
    ReplyType getReplyType();
    String getLink();
    String getLinkTitle();
    String getLinkDescription();
    String getLinkCover();
    LinkCoverSize getLinkCoverSize();
    UserProjection getUser();
    List<ImageProjection> getImages();
    QuoteTweetProjection getQuoteTweet();
    List<PollProjection> getPoll();

    @Value("#{target.retweets.size()}")
    Integer getRetweetsCount();

    @Value("#{target.likedTweets.size()}")
    Integer getLikedTweetsCount();

    @Value("#{target.replies.size()}")
    Integer getRepliesCount();

    interface UserProjection {
        Long getId();
        String getEmail();
        String getFullName();
        String getUsername();
        ImageProjection getAvatar();
    }

    interface ImageProjection {
        Long getId();
        String getSrc();
    }

    interface QuoteTweetProjection {
        Long getId();
        String getText();
        LocalDateTime getDateTime();
        String getLink();
        String getLinkTitle();
        String getLinkDescription();
        String getLinkCover();
        LinkCoverSize getLinkCoverSize();
        UserProjection getUser();
    }

    interface PollProjection {
        Long getId();
        LocalDateTime getDateTime();
        List<PollChoiceProjection> getPollChoices();
    }

    interface PollChoiceProjection {
        Long getId();
        String getChoice();
        List<UserProjection> getVotedUser();
    }
}
