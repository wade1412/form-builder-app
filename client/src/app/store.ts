import { configureStore } from "@reduxjs/toolkit";
import formsApi from "../api/formApi";

const store = configureStore({
  reducer: { [formsApi.reducerPath]: formsApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formsApi.middleware),
});

export default store;
