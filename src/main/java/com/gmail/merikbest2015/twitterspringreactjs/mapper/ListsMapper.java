package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ListsRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ListsResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.service.ListsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ListsMapper {

    private final ModelMapper modelMapper;
    private final ListsService listsService;

    private Lists convertToListsEntity(ListsRequest listsRequest) {
        return modelMapper.map(listsRequest, Lists.class);
    }

    private List<Lists> convertListsResponseToEntity(List<ListsResponse> listsResponse) {
        return listsResponse.stream()
                .map(list -> modelMapper.map(list, Lists.class))
                .collect(Collectors.toList());
    }

    private ListsResponse convertToListsResponse(Lists lists) {
        return modelMapper.map(lists, ListsResponse.class);
    }

    private List<ListsResponse> convertListToResponse(List<Lists> lists) {
        return lists.stream()
                .map(this::convertToListsResponse)
                .collect(Collectors.toList());
    }

    public List<ListsResponse> getAllTweetLists() {
        return convertListToResponse(listsService.getAllTweetLists());
    }

    public List<ListsResponse> getUserTweetLists() {
        return convertListToResponse(listsService.getUserTweetLists());
    }

    public List<ListsResponse> getUserPinnedLists() {
        return convertListToResponse(listsService.getUserPinnedLists());
    }

    public ListsResponse getListById(Long listId) {
        return convertToListsResponse(listsService.getListById(listId));
    }

    public ListsResponse createTweetList(ListsRequest listsRequest) {
        return convertToListsResponse(listsService.createTweetList(convertToListsEntity(listsRequest)));
    }

    public ListsResponse followList(Long listId) {
        return convertToListsResponse(listsService.followList(listId));
    }

    public ListsResponse pinList(Long listId) {
        return convertToListsResponse(listsService.pinList(listId));
    }

    public List<ListsResponse> addTweetToLists(Long tweetId, List<ListsResponse> listsResponse) {
        return convertListToResponse(listsService.addTweetToLists(tweetId, convertListsResponseToEntity(listsResponse)));
    }

    public List<ListsResponse> addUserToLists(Long userId, List<ListsResponse> listsResponse) {
        return convertListToResponse(listsService.addUserToLists(userId, convertListsResponseToEntity(listsResponse)));
    }

    public ListsResponse addUserToList(Long userId, Long listId) {
        return convertToListsResponse(listsService.addUserToList(userId, listId));
    }
}
