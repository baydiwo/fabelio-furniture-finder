/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_DETAIL,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_ERROR
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function fetchDetail() {
  return {
    type: FETCH_DETAIL
  };
}

export function fetchDetailSuccess(furniture_styles, products) {
  console.log(furniture_styles, products, "actions");
  return {
    type: FETCH_DETAIL_SUCCESS,
    furniture_styles,
    products
  };
}

export function fetchDetailError(error) {
  return {
    type: FETCH_DETAIL_ERROR,
    error
  };
}
