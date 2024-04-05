import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import apiService from "../service/apiService";
// import { InputsType, StartUpsType } from "../types";

export type Idea = {
  photo: any;
  userId: number;
  id: number;
  title: string;
  description: string;
  category: string;
  likes?: number;
  dislikes?: number;
  createdAt: Date;
  updatedAt: Date;
  isStartUp: boolean;
};

export type InputsType = {
  title: string;
  description: string;
  category: string;
  photo: File | null;
};

export type IdeasType = Array<Idea>;

export const fetchIdeas = createAsyncThunk("ideas/all", async () => {
  try {
    const response = await apiService.get<IdeasType>(
      `${import.meta.env.VITE_URL}/ideas`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchIdeaById = createAsyncThunk(
  "ideas/one",
  async (id: number) => {
    try {
      const response = await apiService.get<Idea>(
        `${import.meta.env.VITE_URL}/ideas/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAddIdea = createAsyncThunk(
  "ideas/add",
  async (inputs: InputsType) => {
    try {
      const response = await apiService.post<InputsType, AxiosResponse<IdeasType>>(
        `${import.meta.env.VITE_URL}/ideas/new`,
        inputs
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchDeleteIdea = createAsyncThunk(
  "ideas/delete",
  async (id: number) => {
    const response = await apiService.delete(
      `${import.meta.env.VITE_URL}/ideas/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const fetchEditIdea = createAsyncThunk(
  "ideas/edit",
  async ({ inputs, id }: { inputs: InputsType; id: number }) => {
    try {
      const response = await apiService.patch<InputsType, AxiosResponse<IdeasType>>(
        `${import.meta.env.VITE_URL}/ideas/${id}`,
        inputs
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLikes = createAsyncThunk("like/add", async (id: number) => {
  try {
    const response = await apiService.post<AxiosResponse<IdeasType>>(
      `${import.meta.env.VITE_URL}/ideas/like/${id}`
    );
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
});

export const fetchDislikes = createAsyncThunk("dislike/add", async (id: number) => {
    try {
      const response = await apiService.post<AxiosResponse<IdeasType>>(
        `${import.meta.env.VITE_URL}/ideas/dislike/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

