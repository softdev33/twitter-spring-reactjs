package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetsProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.id = :tweetId")
    Optional<TweetProjection> findTweetById(Long tweetId);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.addressedUsername IS NULL " +
            "AND tweet.scheduledDate IS NULL " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> findAllTweets(Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.scheduledDate <= :scheduledDate")
    List<Tweet> findAllByScheduledDate(LocalDateTime scheduledDate);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.user.id = :userId " +
            "AND tweet.scheduledDate IS NOT NULL " +
            "ORDER BY tweet.scheduledDate DESC")
    List<TweetProjection> findAllScheduledTweetsByUserId(Long userId);

    @Query("SELECT t as tweet FROM Tweet t " +
            "LEFT JOIN t.user u " +
            "WHERE t.scheduledDate IS NULL " +
            "AND (t.text LIKE CONCAT('%',:text,'%') " +
            "AND UPPER(u.fullName) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:text,'%'))) " +
            "OR (t.text LIKE CONCAT('%',:text,'%') " +
            "OR UPPER(u.fullName) LIKE UPPER(CONCAT('%',:text,'%')) " +
            "OR UPPER(u.username) LIKE UPPER(CONCAT('%',:text,'%'))) " +
            "ORDER BY t.dateTime DESC")
    List<TweetsProjection> findAllByText(String text);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.scheduledDate IS NULL " +
            "AND tweet.text LIKE CONCAT('%','youtu','%')")
    Page<TweetProjection> findAllTweetsWithVideo(Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet " +
            "WHERE tweet.scheduledDate IS NULL " +
            "AND tweet.images.size != 0 " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> findAllTweetsWithImages(Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet " +
            "LEFT JOIN tweet.images image " +
            "WHERE tweet.scheduledDate IS NULL " +
            "AND (tweet.user.id = :userId AND image.id IS NOT NULL) " +
            "OR (tweet.user.id = :userId AND tweet.text LIKE CONCAT('%','youtu','%')) " +
            "ORDER BY tweet.dateTime DESC")
    Page<TweetProjection> findAllUserMediaTweets(Long userId, Pageable pageable);

    @Query("SELECT tweet FROM Tweet tweet WHERE tweet.quoteTweet.id = :quoteId")
    List<Tweet> findByQuoteTweetId(Long quoteId);

    @Query("SELECT t as tweet FROM Tweet t " +
            "WHERE t.user.id = :userId " +
            "AND t.addressedUsername IS NULL " +
            "AND t.scheduledDate IS NULL " +
            "ORDER BY t.dateTime DESC")
    List<TweetsProjection> findTweetsByUserId(Long userId);

    @Query("SELECT t as tweet FROM Tweet t " +
            "WHERE t.user.id = :userId " +
            "AND t.addressedUsername IS NOT NULL " +
            "AND t.scheduledDate IS NULL " +
            "ORDER BY t.dateTime DESC")
    List<TweetsProjection> findRepliesByUserId(Long userId);

    @Query("SELECT tweet FROM User user LEFT JOIN user.pinnedTweet tweet WHERE user.id = :userId")
    Optional<TweetProjection> getPinnedTweetByUserId(Long userId);

    @Query("SELECT notificationTweet as tweet " +
            "FROM User user " +
            "LEFT JOIN user.notifications notification " +
            "LEFT JOIN notification.tweet notificationTweet " +
            "WHERE user.id = :userId " +
            "AND notification.notificationType = 'TWEET' " +
            "ORDER BY notificationTweet.dateTime DESC")
    List<TweetsProjection> getNotificationsFromTweetAuthors(Long userId);

    @Query("SELECT tagTweet as tweet " +
            "FROM Tag tag " +
            "LEFT JOIN tag.tweets tagTweet " +
            "WHERE tag.tagName = :tagName " +
            "ORDER BY tagTweet.dateTime DESC")
    List<TweetsProjection> getTweetsByTagName(String tagName);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END " +
            "FROM User user " +
            "LEFT JOIN user.likedTweets likedTweet " +
            "WHERE user.id = :userId " +
            "AND likedTweet.tweet.id = :tweetId")
    boolean isUserLikedTweet(Long userId, Long tweetId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END " +
            "FROM User user " +
            "LEFT JOIN user.retweets retweets " +
            "WHERE user.id = :userId " +
            "AND retweets.tweet.id = :tweetId")
    boolean isUserRetweetedTweet(Long userId, Long tweetId);

    @Query("SELECT CASE WHEN count(user) > 0 THEN true ELSE false END " +
            "FROM User user " +
            "LEFT JOIN user.bookmarks bookmark " +
            "WHERE user.id = :userId " +
            "AND bookmark.tweet.id = :tweetId")
    boolean isUserBookmarkedTweet(Long userId, Long tweetId);
}
