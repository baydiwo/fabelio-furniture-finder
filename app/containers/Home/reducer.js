/*
 *
 * Home reducer
 *
 */
import produce from "immer";
import { FETCH_DETAIL_SUCCESS, SEARCH_QUERY } from "./constants";

export const initialState = {
  styles: [],
  products: [],
  styleParam: [],
  deliveryTimeParam: ""
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
      case SEARCH_QUERY:
        console.log(action, "reduce");
        Object.assign(draft, {
          ...draft,
          styleParam: action.styleParam,
          deliveryTimeParam: action.deliveryTimeParam
        });
        break;
    }
  });

export default homeReducer;
