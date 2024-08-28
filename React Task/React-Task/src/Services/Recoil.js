import { atom } from "recoil";

export const productState = atom({
  key: "products",
  default: [],
});

export const loadingState = atom({
  key: "loadingState",
  default: false, // Initially, not loading
});