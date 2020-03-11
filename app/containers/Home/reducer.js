/*
 *
 * Home reducer
 *
 */
import produce from "immer";
import { FETCH_DETAIL_SUCCESS } from "./constants";

export const initialState = {
  styles: [],
  products: []
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_DETAIL_SUCCESS:
        Object.assign(draft, {
          ...draft,
          styles: action.furniture_styles,
          products: action.products
        });
        break;
    }
  });

export default homeReducer;
