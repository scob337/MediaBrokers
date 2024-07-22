import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./isOpen/reduxSlice";
import listsSlice from "./ListsSlice/listsSlice";
import TemplateSlice from "./isOpen/TemplateSlice/TemplateSlice";

const store = configureStore({
  reducer: {
    app: reduxSlice,
    lists: listsSlice,
    template: TemplateSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
