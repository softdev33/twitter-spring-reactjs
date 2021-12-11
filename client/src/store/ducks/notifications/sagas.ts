import {call, put, takeLatest} from 'redux-saga/effects';

import {NotificationsActionsType} from "./contracts/actionTypes";
import {setNotifications, setNotificationsLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {Notifications} from "./contracts/state";
import {UserApi} from "../../../services/api/userApi";

export function* fetchNotificationsRequest() {
    try {
        yield put(setNotificationsLoadingState(LoadingStatus.LOADING));
        const items: Notifications = yield call(UserApi.getUserNotifications);
        yield put(setNotifications(items));
        yield put(setNotificationsLoadingState(LoadingStatus.LOADED));
    } catch (error) {
        yield put(setNotificationsLoadingState(LoadingStatus.ERROR));
    }
}

export function* notificationsSaga() {
    yield takeLatest(NotificationsActionsType.FETCH_NOTIFICATIONS, fetchNotificationsRequest);
}
