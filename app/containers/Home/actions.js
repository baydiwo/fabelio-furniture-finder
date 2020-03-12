/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_DETAIL,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_ERROR,
  SEARCH_QUERY
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

export function fetchSearchQuery(styleParam, deliveryTimeParam) {
  console.log(styleParam, deliveryTimeParam, "query");
  return {
    type: SEARCH_QUERY,
    styleParam,
    deliveryTimeParam
  };
}
