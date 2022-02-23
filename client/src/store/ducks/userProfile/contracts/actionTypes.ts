import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {UserProfileResponse} from "../../../types/user";

export enum UserProfileActionsType {
    SET_USER = 'userProfile/SET_USER',
    FETCH_USER = 'userProfile/FETCH_USER',  // +
    FETCH_CHAT_PARTICIPANT = 'userProfile/FETCH_CHAT_PARTICIPANT',


    PROCESS_SUBSCRIBE = 'userProfile/PROCESS_SUBSCRIBE',
    PROCESS_FOLLOW_REQUEST = 'userProfile/PROCESS_FOLLOW_REQUEST',
    RESET_USER_PROFILE_STATE = "userProfile/RESET_USER_PROFILE_STATE",
    SET_USER_LOADING_STATE = 'userProfile/SET_USER_LOADING_STATE',
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    SET_BLOCKED = 'userProfile/SET_BLOCKED', // +
    SET_MUTED = 'userProfile/SET_MUTED', // +
    SET_FOLLOW_TO_USER_PROFILE = 'userProfile/FOLLOW_TO_USER_PROFILE', // +

}

export interface SetBlockedActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_BLOCKED;
    payload: boolean;
}

export interface SetMutedActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_MUTED;
    payload: boolean;
}

export interface SeFollowToUserProfileActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE;
    payload: boolean;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface SetUserProfileActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_USER;
    payload: UserProfileResponse;
}

export interface FetchUserProfileActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.FETCH_USER;
    payload: number;
}

export interface FetchChatParticipantActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT;
    payload: { participantId: number, chatId: number };
}

export interface ProcessSubscribeActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.PROCESS_SUBSCRIBE;
    payload: number;
}

export interface ProcessFollowRequestActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.PROCESS_FOLLOW_REQUEST;
    payload: number;
}

export interface ResetUserProfileStateActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.RESET_USER_PROFILE_STATE;
}

export interface SetUserProfileLoadingStatusActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export type UserProfileActions =
    | SetUserProfileActionInterface // +
    | ResetUserProfileStateActionInterface // +
    | SetUserProfileLoadingStatusActionInterface // +
    | SetBlockedActionInterface // +
    | SetMutedActionInterface // +
    | SeFollowToUserProfileActionInterface; // +
