import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "./api/authApi";
import { dialogsApi } from "./api/dialogsApi";
import { profileApi } from "./api/profileApi";
import { usersApi } from "./api/usersApi";
import { chatApi } from "./api/chatApi";
import { dialogSlice } from "./reducers/dialogSlice";
import chatReducer from "./reducers/chatReducer";

const rootReducer = combineReducers({
    [usersApi.reducerPath] : usersApi.reducer,
    [authApi.reducerPath] : authApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [dialogsApi.reducerPath] : dialogsApi.reducer,
    dialogSlice: dialogSlice.reducer,
    chatReducer: chatReducer,

})

type RootReducerType = typeof rootReducer; 
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      usersApi.middleware, 
      authApi.middleware, 
      profileApi.middleware,
      dialogsApi.middleware,
      )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;