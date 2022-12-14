import {
    FetchFollowersActionInterface,
    FetchFollowingsActionInterface,
    FetchParticipantsSearchByNameActionInterface,
    FetchUsersSearchActionInterface,
    FetchUsersSearchByNameActionInterface,
    ResetUsersStateActionInterface,
    SetBlockUsersSearchStateActionInterface,
    SetFollowersActionInterface,
    SetFollowRequestToUsersSearchStateActionInterface,
    SetFollowToUsersSearchStateActionInterface,
    SetPageableUsersSearchActionInterface,
    SetUsersSearchActionInterface,
    SetUsersSearchLoadingStatusActionInterface,
    UsersSearchActionsType
} from './contracts/actionTypes';
import {UsersSearchState} from "./contracts/state";

export const setUsersSearch = (payload: UsersSearchState["users"]): SetUsersSearchActionInterface => ({
    type: UsersSearchActionsType.SET_USERS,
    payload
});

export const setPageableUsersSearch = (payload: { items: UsersSearchState["users"], pagesCount: UsersSearchState["pagesCount"] }): SetPageableUsersSearchActionInterface => ({
    type: UsersSearchActionsType.SET_PAGEABLE_USERS,
    payload
});

export const setFollowers = (payload: UsersSearchState["followers"]): SetFollowersActionInterface => ({
    type: UsersSearchActionsType.SET_FOLLOWERS,
    payload
});

export const setFollowToUsersSearchState = (payload: { userId: number; isFollower: boolean; }): SetFollowToUsersSearchStateActionInterface => ({
    type: UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE,
    payload
});

export const setFollowRequestToUsersSearchState = (payload: { userId: number; isWaitingForApprove: boolean; }): SetFollowRequestToUsersSearchStateActionInterface => ({
    type: UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE,
    payload
});

export const setBlockUsersSearchState = (payload: { userId: number; isUserBlocked: boolean; }): SetBlockUsersSearchStateActionInterface => ({
    type: UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE,
    payload
});

export const fetchUsersSearch = (payload: number): FetchUsersSearchActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS,
    payload
});

export const fetchFollowers = (payload: string): FetchFollowersActionInterface => ({
    type: UsersSearchActionsType.FETCH_FOLLOWERS,
    payload
});

export const fetchFollowings = (payload: string): FetchFollowingsActionInterface => ({
    type: UsersSearchActionsType.FETCH_FOLLOWINGS,
    payload
});

export const fetchUsersSearchByUsername = (payload: { username: string, page: number }): FetchUsersSearchByNameActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS_BY_NAME,
    payload
});

export const fetchParticipantsByUsername = (payload: { username: string, page: number }): FetchParticipantsSearchByNameActionInterface => ({
    type: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME,
    payload
});

export const resetUsersState = (): ResetUsersStateActionInterface => ({
    type: UsersSearchActionsType.RESET_USERS_STATE,
});

export const setUsersSearchLoadingState = (payload: UsersSearchState["loadingState"]): SetUsersSearchLoadingStatusActionInterface => ({
    type: UsersSearchActionsType.SET_USERS_LOADING_STATE,
    payload
});
