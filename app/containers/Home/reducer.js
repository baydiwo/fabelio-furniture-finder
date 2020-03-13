/*
 *
 * Home reducer
 *
 */
import produce from "immer";
import {
  FETCH_DETAIL_SUCCESS,
  SEARCH_QUERY,
  SEARCH_QUERY_DATA
} from "./constants";
import { filter } from "lodash";

export const initialState = {
  styles: [],
  products: [],
  styleParam: [],
  deliveryTimeParam: ""
};

// function filterProducts(param, arr) {
//   // return filter(arr, function(o) {
//   //   return (
//   //     filter(o.furniture_style, function(cat) {
//   //       return param.indexOf(cat) > -1;
//   //     }).length === param.length
//   //   );
//   // });
//   console.log(param, arr);
//   return filter(arr, el => {
//     return el.delivery_time.toString() === param.toString();
//   });
// }

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
        Object.assign(draft, {
          ...draft,
          styleParam: action.styleParam,
          deliveryTimeParam: action.deliveryTimeParam
        });
        break;
      case SEARCH_QUERY_DATA:
        console.log(action.products);
        break;
    }
  });

export default homeReducer;
