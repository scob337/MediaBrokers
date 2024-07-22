import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  isOpenTemp: false;
}

const initialState: AppState = {
  isSidebarOpen: false,
  isModalOpen: false,
  isOpenTemp: false,
};

const reduxSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      
      state.isSidebarOpen = !state.isSidebarOpen;
    
    },
    toggleModal: (state) => {
      
      state.isModalOpen = !state.isModalOpen;
    
    },
    addToggleModal: (state) => {
      
      state.isOpenTemp = !state.isOpenTemp;
    
    },
  },
});

export const { toggleSidebar, toggleModal, addToggleModal } = reduxSlice.actions;

export default reduxSlice.reducer;
