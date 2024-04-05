import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveSaleBook = createAsyncThunk('sale/book', async (data) => {
    try {
        console.log(data);
        const ideaUser = await axios.post(`${import.meta.env.VITE_URL}/images`,
         data,
         {withCredentials: true, headers: { 'content-type': 'multipart/form-data' },})
        return ideaUser.data
    } catch (error) {
        console.log(error);
    }
})