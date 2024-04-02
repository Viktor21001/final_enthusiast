import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
// import { InputsType, StartUpsType } from "../types";

export type Idea = {
  userId: number;
  id: number;
  title: string;
  description: string;
  category: string[];
  likes?: number;
  dislikes?: number;
  createdAt: Date;
  updatedAt: Date;
  isStartUp: boolean;
};

export type InputsType = {
  title: string;
  description: string;
  category: string[];
};

export type IdeasType = Array<Idea>;

export const fetchIdeas = createAsyncThunk("ideas/all", async () => {
  try {
    const response = await axios.get<IdeasType>(
      `${import.meta.env.VITE_URL}/startups`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAddIdea = createAsyncThunk(
  "ideas/add",
  async (inputs: InputsType) => {
    try {
      const response = await axios.post<InputsType, AxiosResponse<IdeasType>>(
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
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/ideas/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const fetchEditIdea = createAsyncThunk(
  "iedas/edit",
  async ({ inputs, id }: { inputs: InputsType; id: number }) => {
    try {
      const response = await axios.patch<InputsType, AxiosResponse<IdeasType>>(
        `${import.meta.env.VITE_URL}/ideas/${id}`,
        inputs
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLikes = createAsyncThunk("likes/add", async (id: number) => {
  try {
    const response = await axios.post<AxiosResponse<IdeasType>>(
      `${import.meta.env.VITE_URL}/ideas/like/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchDislikes = createAsyncThunk("dislikes/add", async (id: number) => {
    try {
      const response = await axios.post<AxiosResponse<IdeasType>>(
        `${import.meta.env.VITE_URL}/ideas/dislike/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

