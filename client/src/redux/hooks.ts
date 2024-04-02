import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

type DispatchFunc = () => ThunkDispatch<RootState, unknown, UnknownAction>;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;