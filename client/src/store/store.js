import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth-slice/index";
import adminProductsSlice from "./admin/products-slice/index"
import shopProductsSlice from "./shop/products-slice/index"
import shopCartSlice from "./shop/cart-slice/index"
import shopAddressSlice from "./shop/address-slice/index"
import shopOrderSlice from "./shop/order-slice/index"
import shopSearchSlice from "./shop/search-slice/index"
import adminOrderSlice from "./admin/order-slice/index"
import shopReviewSlice from "./shop/review-slice/index"
import commonFeatureSlice from "./common-slice/index"


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts : shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder: shopOrderSlice,
        adminOrder: adminOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,
        commonFeature: commonFeatureSlice
    }
})

export default store;