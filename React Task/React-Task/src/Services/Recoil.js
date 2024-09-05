import { atom,atomFamily } from "recoil";

export const AllProductsState = atom({
  key: "AllProducts",
  default: [],
});

export const productState = atom({
  key: "products",
  default: {},
});

export const categoryState = atom({
  key: "categoryState",
  default: [],
});


export const loadingState = atom({
  key: "loadingState",
  default: false, 
});

export const imageLoadingState = atomFamily({
  key: "imageLoading",
  default: true,
});


export const singleProductState = atom({
  key:"singleProduct",
  default:{},
})


export const limitProductState = atom({
  key:"limitProduct",
  default:30,
})


export const searchProductState = atom({
  key:"searchProduct",
  default:"",
})


export const paginationState = atom({
  key:"paginationState",
  default:1,
})