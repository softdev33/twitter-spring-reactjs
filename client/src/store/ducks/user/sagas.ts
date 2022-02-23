import {call, put, takeLatest} from 'redux-saga/effects';
import {
    setBackgroundColor,
    setColorScheme,
    setCountry,
    setDirect,
    setEmail,
    setGender,
    setLanguage,
    setPhone,
    setPinTweetId,
    setPrivateProfile,
    setProfileStarted,
    setReadMessage,
    setUserData,
    setUserLoadingStatus,
    setUsername
} from "./actionCreators";
import {
    AddUserToBlocklistActionInterface, AddUserToMuteListActionInterface,
    FetchPinTweetActionInterface,
    FetchReadMessagesActionInterface,
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FollowUserActionInterface,
    StartUseTwitterActionInterface,
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
import {AuthApi} from "../../../services/api/authApi";
import {UserApi} from "../../../services/api/userApi";
import {LoadingStatus} from "../../types";
import {ChatApi} from "../../../services/api/chatApi";
import {UserSettingsApi} from "../../../services/api/userSettingsApi";
import {AuthenticationResponse} from "../../types/auth";
import {AuthUserResponse} from "../../types/user";
import {setBlocked, setMuted, setUserProfileLoadingState} from "../userProfile/actionCreators";

export function* updateUserDataRequest({payload}: UpdateUserDataActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUserResponse = yield call(UserApi.updateUserProfile, payload);
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignInRequest({payload}: FetchSignInActionInterface) { //+
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthenticationResponse = yield call(AuthApi.signIn, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
        payload.history.push("/home");
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) { //+
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthenticationResponse = yield call(AuthApi.endRegistration, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
        payload.history.push({pathname: `/user/${data.user.id}`, state: {isRegistered: true}});
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserDataRequest() { //+
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthenticationResponse = yield call(AuthApi.getMe);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
    } catch (error) {
        if (localStorage.getItem('token') !== null) {
            yield put(setUserLoadingStatus(LoadingStatus.ERROR));
        }
    }
}

export function* followUserRequest({payload}: FollowUserActionInterface) { //+
    try {
        yield call(UserApi.follow, payload);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* unfollowUserRequest({payload}: UnfollowUserActionInterface) { //+
    try {
        yield call(UserApi.follow, payload);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* startUseTwitterRequest({payload}: StartUseTwitterActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.startUseTwitter, payload);
        yield put(setProfileStarted(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchPinTweetRequest({payload}: FetchPinTweetActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: number = yield call(UserApi.pinTweet, payload);
        yield put(setPinTweetId(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchReadMessagesRequest({payload}: FetchReadMessagesActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: number = yield call(ChatApi.readChatMessages, payload);
        yield put(setReadMessage(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateUsernameRequest({payload}: UpdateUsernameActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateUsername, payload);
        yield put(setUsername(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateEmailRequest({payload}: UpdateEmailActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: AuthenticationResponse = yield call(UserSettingsApi.updateEmail, payload);
        localStorage.setItem("token", item.token);
        yield put(setEmail(item.user.email));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePhoneRequest({payload}: UpdatePhoneActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: { countryCode: string; phone: number } = yield call(UserSettingsApi.updatePhone, payload);
        yield put(setPhone({countryCode: item.countryCode, phone: item.phone}));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateCountryRequest({payload}: UpdateCountryActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateCountry, payload);
        yield put(setCountry(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateGenderRequest({payload}: UpdateGenderActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateGender, payload);
        yield put(setGender(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateLanguageRequest({payload}: UpdateLanguageActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateLanguage, payload);
        yield put(setLanguage(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateDirectRequest({payload}: UpdateDirectActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserSettingsApi.updateDirectMessageRequests, payload);
        yield put(setDirect(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePrivateProfileRequest({payload}: UpdatePrivateProfileActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserSettingsApi.updatePrivateProfile, payload);
        yield put(setPrivateProfile(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateColorSchemeRequest({payload}: UpdateColorSchemeActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateColorScheme, payload);
        yield put(setColorScheme(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateBackgroundColorRequest({payload}: UpdateBackgroundColorActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateBackgroundColor, payload);
        yield put(setBackgroundColor(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addUserToBlocklistRequest({payload}: AddUserToBlocklistActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.processBlockList, payload);
        yield put(setBlocked(item));
        // set to users payload: { userId: number; isUserBlocked: boolean };
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addUserToMuteListRequest({payload}: AddUserToMuteListActionInterface) { // +
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.processMutedList, payload);
        yield put(setMuted(item));
        // set to users payload: { userId: number; isUserBlocked: boolean };
    } catch (e) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* userSaga() {
    yield takeLatest(UserActionsType.UPDATE_USER_DATA, updateUserDataRequest); //+
    yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest); //+
    yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest); //+
    yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest); //+
    yield takeLatest(UserActionsType.FOLLOW_USER, followUserRequest);// +
    yield takeLatest(UserActionsType.UNFOLLOW_USER, unfollowUserRequest); //+
    yield takeLatest(UserActionsType.START_USE_TWITTER, startUseTwitterRequest); // +
    yield takeLatest(UserActionsType.FETCH_PIN_TWEET, fetchPinTweetRequest);
    yield takeLatest(UserActionsType.FETCH_READ_MESSAGES, fetchReadMessagesRequest); // +
    yield takeLatest(UserActionsType.UPDATE_USERNAME, updateUsernameRequest);  // +
    yield takeLatest(UserActionsType.UPDATE_EMAIL, updateEmailRequest); // +
    yield takeLatest(UserActionsType.UPDATE_PHONE, updatePhoneRequest); // +
    yield takeLatest(UserActionsType.UPDATE_COUNTRY, updateCountryRequest); // +
    yield takeLatest(UserActionsType.UPDATE_GENDER, updateGenderRequest); // +
    yield takeLatest(UserActionsType.UPDATE_LANGUAGE, updateLanguageRequest); // +
    yield takeLatest(UserActionsType.UPDATE_DIRECT, updateDirectRequest); // +
    yield takeLatest(UserActionsType.UPDATE_PRIVATE_PROFILE, updatePrivateProfileRequest); // +
    yield takeLatest(UserActionsType.UPDATE_COLOR_SCHEME, updateColorSchemeRequest); // +
    yield takeLatest(UserActionsType.UPDATE_BACKGROUND_COLOR, updateBackgroundColorRequest); // +
    yield takeLatest(UserActionsType.ADD_USER_TO_BLOCKLIST, addUserToBlocklistRequest); // +
    yield takeLatest(UserActionsType.ADD_USER_TO_MUTELIST, addUserToMuteListRequest); // +
}
