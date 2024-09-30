import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk("/order/addReview", async(formData) => {
    
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`, formData)
    return result.data
})

export const getReviews = createAsyncThunk("/order/getReviews", async(id) => {
    
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/${id}`)
    return result.data
})

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false
                state.reviews = action?.payload?.data
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false
                state.reviews = []
            })
    }
})

export default reviewSlice.reducer