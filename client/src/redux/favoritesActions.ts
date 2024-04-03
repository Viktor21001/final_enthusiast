import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { StartUpsType } from "./startUpActions";
import { apiService } from "../service/apiService";
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
        const response = await apiService.post<StartUpsType>(
          `${import.meta.env.VITE_URL}/favorites/new/${id}`,
        );
  
        if (response.data) {
          return response.data;
        } else {
          return id;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

// export const fetchDeleteStartUp = createAsyncThunk(
//   "startUps/delete",
//   async (id: number) => {
//     const response = await axios.delete(
//       `${import.meta.env.VITE_URL}/startups/${id}`
//     );
//     if (response.status === 200) {
//       return id;
//     }
//   }
// );

