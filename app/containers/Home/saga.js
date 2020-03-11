import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_DETAIL } from "./constants";
import { fetchDetailSuccess, fetchDetailError } from "./actions";

import request from "utils/request";

export function* fetchDetail() {
  try {
    const { furniture_styles, products } = yield call(
      request,
      "http://www.mocky.io/v2/5c9105cb330000112b649af8"
    );
    const data = { furniture_styles, products };

    yield put(fetchDetailSuccess(furniture_styles, products));
  } catch (error) {
    yield put(fetchDetailError(error));
  }
}

// Individual exports for testing
export default function* homeSaga() {
  yield takeLatest(FETCH_DETAIL, fetchDetail);
}
