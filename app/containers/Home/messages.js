/*
 * Home Messages
 *
 * This contains all the text for the Home container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.Home";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the Home container!"
  },
  searchFurniture: {
    id: `${scope}.searchFurniture`,
    defaultMessage: "Search Furniture"
  },
  furnitureStyle: {
    id: `${scope}.furnitureStyle`,
    defaultMessage: "Furniture Style"
  },
  deliveryTime: {
    id: `${scope}.deliveryTime`,
    defaultMessage: "Delivery Time"
  }
});
