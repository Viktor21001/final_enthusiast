import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import apiService from '../service/apiService';

export type Member = {
  id: number;
  userId?: number;
  login?: string;
  startUpId: number;
  role: string;
  msg?: string;
};

export type memberInputsType = {
  userId?: number;
  startUpId?: number;
  login?: string;
  role: string;
};

export type MembersType = Array<Member>;

export const fetchMembers = createAsyncThunk(
  'members/all',
  async (id: number) => {
    try {
      const response = await apiService.get<MembersType>(
        `${import.meta.env.VITE_URL}/members/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAddMember = createAsyncThunk(
  'member/add',
  async ({ inputs, id }: { inputs: memberInputsType; id: number }) => {
    try {
      const response = await apiService.post<
        memberInputsType,
        AxiosResponse<MembersType>
      >(`${import.meta.env.VITE_URL}/members/new/${id}`, inputs);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchDeleteMember = createAsyncThunk(
  'member/delete',
  async (id: number) => {
    const response = await apiService.delete(
      `${import.meta.env.VITE_URL}/members/${id}`
    );
    if (response.status === 200) {
      return id;
    }
  }
);
