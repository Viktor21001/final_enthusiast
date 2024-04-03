import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { StartUpsType } from "./startUpActions";
// import { InputsType, StartUpsType } from "../types";

export const fetchFavorites = createAsyncThunk("favorites/all", async () => {
  try {
    const response = await axios.get<StartUpsType>(
      `${import.meta.env.VITE_URL}/favorites`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAddFavorites = createAsyncThunk(
  "favorites/add",
  async (id: number) => {
    try {
      const response = await axios.post<StartUpsType>(
        `${import.meta.env.VITE_URL}/favorites/new/${id}`,
        { withCredentials: true }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const fetchDeleteFavorites = createAsyncThunk(
  "favorites/delete",
  async (id: number) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/favorites/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);
