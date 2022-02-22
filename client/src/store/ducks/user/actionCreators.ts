import {Settings, User, UserState} from "./contracts/state";
import {
    AcceptFollowRequestActionInterface,
    AddTweetToBookmarksActionInterface,
    DeclineFollowRequestActionInterface,
    FetchPinTweetActionInterface,
    FetchReadMessagesActionInterface,
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FetchUserDataActionInterface,
    // FollowActionInterface,
    FollowUserActionInterface,
    SetBackgroundColorActionInterface,
    SetColorSchemeActionInterface,
    SetCountryActionInterface,
    SetDirectActionInterface,
    SetEmailActionInterface,
    SetFollowersSizeActionInterface,
    SetGenderActionInterface,
    SetLanguageActionInterface,
    SetNewNotificationActionInterface,
    SetPhoneActionInterface,
    SetPinTweetIdActionInterface,
    SetPrivateProfileActionInterface,
    SetProfileStartedActionInterface,
    SetReadMessageActionInterface,
    SetUnreadMessageActionInterface,
    SetUserDataActionInterface,
    SetUserLoadingStateActionInterface,
    SetUsernameActionInterface,
    SignOutActionInterface,
    StartUseTwitterActionInterface,
    // UnfollowActionInterface,
    UnfollowUserActionInterface,
    UpdateBackgroundColorActionInterface,
    UpdateColorSchemeActionInterface,
    UpdateCountryActionInterface,
    UpdateDirectActionInterface,
    UpdateEmailActionInterface,
    UpdateGenderActionInterface,
    UpdateLanguageActionInterface,
    UpdatePhoneActionInterface,
    UpdatePrivateProfileActionInterface,
    UpdateUserDataActionInterface,
    UpdateUsernameActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {RegistrationProps} from "../../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";
import {LoginProps} from "../../../pages/Login/Login";
import {ChatMessage} from "../chatMessages/contracts/state";
import {AuthUserResponse} from "../../types/user";

export const updatedUserData = (payload: AuthUserResponse): UpdateUserDataActionInterface => ({  // +check
    type: UserActionsType.UPDATE_USER_DATA,
    payload
});

export const setFollowersSize = (): SetFollowersSizeActionInterface => ({ //+
    type: UserActionsType.SET_FOLLOWERS_SIZE
});

export const setProfileStarted = (payload: boolean): SetProfileStartedActionInterface => ({ //+
    type: UserActionsType.SET_PROFILE_STARTED,
    payload
});

export const setPinTweetId = (payload: number): SetPinTweetIdActionInterface => ({ //+
    type: UserActionsType.SET_PIN_TWEET_ID,
    payload
});

export const setReadMessage = (payload: number): SetReadMessageActionInterface => ({ //+
    type: UserActionsType.SET_READ_MESSAGE,
    payload
});

export const setUserData = (payload: UserState["data"]): SetUserDataActionInterface => ({ //+
    type: UserActionsType.SET_USER_DATA,
    payload
});

export const signOut = (): SignOutActionInterface => ({
    type: UserActionsType.SIGN_OUT,
});

export const fetchSignIn = (payload: LoginProps): FetchSignInActionInterface => ({ //+
    type: UserActionsType.FETCH_SIGN_IN,
    payload,
});

export const fetchSignUp = (payload: RegistrationProps): FetchSignUpActionInterface => ({ //+
    type: UserActionsType.FETCH_SIGN_UP,
    payload,
});

export const fetchUserData = (): FetchUserDataActionInterface => ({ //+
    type: UserActionsType.FETCH_USER_DATA,
});

export const setUserLoadingStatus = (payload: UserState["status"]): SetUserLoadingStateActionInterface => ({
    type: UserActionsType.SET_USER_LOADING_STATE,
    payload
});

export const followUser = (payload: number): FollowUserActionInterface => ({ //+
    type: UserActionsType.FOLLOW_USER,
    payload,
});

export const unfollowUser = (payload: number): UnfollowUserActionInterface => ({ //+
    type: UserActionsType.UNFOLLOW_USER,
    payload,
});

// export const follow = (payload: number): FollowActionInterface => ({
//     type: UserActionsType.FOLLOW,
//     payload,
// });

// export const unfollow = (payload: number): UnfollowActionInterface => ({
//     type: UserActionsType.UNFOLLOW,
//     payload,
// });

export const acceptFollowRequest = (payload: number): AcceptFollowRequestActionInterface => ({
    type: UserActionsType.ACCEPT_FOLLOW_REQUEST,
    payload,
});

export const declineFollowRequest = (payload: number): DeclineFollowRequestActionInterface => ({
    type: UserActionsType.DECLINE_FOLLOW_REQUEST,
    payload,
});

export const fetchPinTweet = (payload: string): FetchPinTweetActionInterface => ({
    type: UserActionsType.FETCH_PIN_TWEET,
    payload,
});

export const addTweetToBookmarks = (payload: string): AddTweetToBookmarksActionInterface => ({
    type: UserActionsType.ADD_TWEET_TO_BOOKMARKS,
    payload,
});

export const startUseTwitter = (payload: number): StartUseTwitterActionInterface => ({
    type: UserActionsType.START_USE_TWITTER,
    payload,
});

export const fetchReadMessages = (payload: number): FetchReadMessagesActionInterface => ({
    type: UserActionsType.FETCH_READ_MESSAGES,
    payload,
});

export const setUnreadMessage = (payload: ChatMessage): SetUnreadMessageActionInterface => ({
    type: UserActionsType.SET_UNREAD_MESSAGE,
    payload,
});

export const setNewNotification = (): SetNewNotificationActionInterface => ({
    type: UserActionsType.SET_NEW_NOTIFICATION,
});

// export const addUserToBlocklist = (payload: number): AddUserToBlocklistActionInterface => ({
//     type: UserActionsType.ADD_USER_TO_BLOCKLIST,
//     payload,
// });

// export const addUserToMuteList = (payload: number): AddUserToMuteListActionInterface => ({
//     type: UserActionsType.ADD_USER_TO_MUTELIST,
//     payload,
// });

export const updateUsername = (payload: Settings): UpdateUsernameActionInterface => ({
    type: UserActionsType.UPDATE_USERNAME,
    payload,
});

export const updateEmail = (payload: Settings): UpdateEmailActionInterface => ({
    type: UserActionsType.UPDATE_EMAIL,
    payload,
});

export const updatePhone = (payload: Settings): UpdatePhoneActionInterface => ({
    type: UserActionsType.UPDATE_PHONE,
    payload,
});

export const updateCountry = (payload: Settings): UpdateCountryActionInterface => ({
    type: UserActionsType.UPDATE_COUNTRY,
    payload,
});

export const updateGender = (payload: Settings): UpdateGenderActionInterface => ({
    type: UserActionsType.UPDATE_GENDER,
    payload,
});

export const updateLanguage = (payload: Settings): UpdateLanguageActionInterface => ({
    type: UserActionsType.UPDATE_LANGUAGE,
    payload,
});

export const updateDirect = (payload: Settings): UpdateDirectActionInterface => ({
    type: UserActionsType.UPDATE_DIRECT,
    payload,
});

export const updatePrivateProfile = (payload: Settings): UpdatePrivateProfileActionInterface => ({
    type: UserActionsType.UPDATE_PRIVATE_PROFILE,
    payload,
});

export const updateColorScheme = (payload: Settings): UpdateColorSchemeActionInterface => ({
    type: UserActionsType.UPDATE_COLOR_SCHEME,
    payload,
});

export const updateBackgroundColor = (payload: Settings): UpdateBackgroundColorActionInterface => ({
    type: UserActionsType.UPDATE_BACKGROUND_COLOR,
    payload,
});

export const setUsername = (payload: string): SetUsernameActionInterface => ({
    type: UserActionsType.SET_USERNAME,
    payload,
});

export const setEmail = (payload: string): SetEmailActionInterface => ({
    type: UserActionsType.SET_EMAIL,
    payload,
});

export const setPhone = (payload: { countryCode: string; phone: number }): SetPhoneActionInterface => ({
    type: UserActionsType.SET_PHONE,
    payload,
});

export const setCountry = (payload: string): SetCountryActionInterface => ({
    type: UserActionsType.SET_COUNTRY,
    payload,
});

export const setGender = (payload: string): SetGenderActionInterface => ({
    type: UserActionsType.SET_GENDER,
    payload,
});

export const setLanguage = (payload: string): SetLanguageActionInterface => ({
    type: UserActionsType.SET_LANGUAGE,
    payload,
});

export const setDirect = (payload: boolean): SetDirectActionInterface => ({
    type: UserActionsType.SET_DIRECT,
    payload,
});

export const setPrivateProfile = (payload: boolean): SetPrivateProfileActionInterface => ({
    type: UserActionsType.SET_PRIVATE_PROFILE,
    payload,
});

export const setColorScheme = (payload: string): SetColorSchemeActionInterface => ({
    type: UserActionsType.SET_COLOR_SCHEME,
    payload,
});

export const setBackgroundColor = (payload: string): SetBackgroundColorActionInterface => ({
    type: UserActionsType.SET_BACKGROUND_COLOR,
    payload,
});
