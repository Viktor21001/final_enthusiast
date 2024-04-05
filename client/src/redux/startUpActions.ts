import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import apiService from '../service/apiService';
// import { InputsType, StartUpsType } from "../types";

export type StartUp = {
  id: number;
  userId:number;
  startUpTitle: string;
  startUpDescription: string;
  startUpCategory: string;
  progress: number;
  currentAmount: number;
  targetAmount: number;
  createdAt: Date;
  updatedAt: Date;
  members?: StartUpMember[];
  funding?: number;
  msg?: string;
};

export type StartUpMember = {
  userId: number;
  role: string;
};

export type InputsType = {
  members?: StartUpMember[];
  startUpTitle: string;
  startUpDescription: string;
  startUpCategory: string;
  progress: number;
  currentAmount?: number;
  targetAmount: number;
  amount?: number;
};

export type StartUpsType = Array<StartUp>;

export const fetchStartUps = createAsyncThunk('startUps/all', async () => {
  try {
    const response = await apiService.get<StartUpsType>(
      `${import.meta.env.VITE_URL}/startups`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchStartUpById = createAsyncThunk(
  'startUp/one',
  async (id: number) => {
    try {
      const response = await apiService.get<StartUpsType>(
        `${import.meta.env.VITE_URL}/startups/${id}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAddStartUp = createAsyncThunk(
  'startUps/add',
  async (inputs: InputsType) => {
    try {
      const response = await apiService.post<
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
  'startUps/delete',
  async (id: number) => {
    const response = await apiService.delete(
      `${import.meta.env.VITE_URL}/startups/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);

export const fetchEditstartUp = createAsyncThunk(
  'startUps/edit',
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
  'funding/add',
  async ({ amount, id }: { amount: number; id: number }) => {
    try {
      const response = await apiService.post<AxiosResponse<StartUpsType>>(
        `${import.meta.env.VITE_URL}/startups/funding/${id}`,
        { amount: amount }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
