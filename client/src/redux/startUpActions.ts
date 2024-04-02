import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
// import { InputsType, StartUpsType } from "../types";

export type StartUp = {
  id: number;
  startUpTitle: string;
  startUpDescription: string;
  startUpCategory: string[];
  progress: number;
  currentAmount: number;
  targetAmount: number;
  createdAt: Date;
  updatedAt: Date;
  members: StartUpMember[];
  funding?: number;
};

export type StartUpMember = {
  userId: number;
  role: string;
};

export type InputsType = {
  members: StartUpMember[];
  title: string;
  description: string;
  categories: string[];
  progress: number;
  currentAmount?: number;
  targetAmount: number;
  amount?: number;
};

export type StartUpsType = Array<StartUp>;

export const fetchStartUps = createAsyncThunk("startUps/all", async () => {
  try {
    const response = await axios.get<StartUpsType>(
      `${import.meta.env.VITE_URL}/startups`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAddStartUp = createAsyncThunk(
  "startUps/add",
  async (inputs: InputsType) => {
    try {
      const response = await axios.post<
        InputsType,
        AxiosResponse<StartUpsType>
      >(`${import.meta.env.VITE_URL}/startups/new`, inputs);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchDeleteStartUp = createAsyncThunk(
  "startUps/delete",
  async (id: number) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/startups/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const fetchEditstartUp = createAsyncThunk(
  "startUps/edit",
  async ({ inputs, id }: { inputs: InputsType; id: number }) => {
    try {
      const response = await axios.patch<
        InputsType,
        AxiosResponse<StartUpsType>
      >(`${import.meta.env.VITE_URL}/startups/${id}`, inputs);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAddFunding = createAsyncThunk(
  "funding/add",
  async ({ amount, id }: { amount: number; id: number }) => {
    try {
      const response = await axios.post<AxiosResponse<StartUpsType>>(
        `${import.meta.env.VITE_URL}/startups/funding/${id}`,
        amount
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/add",
  async ({ amount, id }: { amount: number; id: number }) => {
    try {
      const response = await axios.post<AxiosResponse<StartUpsType>>(
        `${import.meta.env.VITE_URL}/startups/funding/${id}`,
        amount
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);