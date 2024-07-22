import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emailTemplate, axiosApi, emailLists, update } from "../../../Api/Api";
import axios from "axios";

// -------Get Data--------

export const getTemplateData = createAsyncThunk(
  "template/GetTemplateData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `https://mediabrokers.lcisoft.it/api/v1/email-template`
      );
      return res.data.templates;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

// --------Add Data---------
export const addEmailData = createAsyncThunk(
  "template/addTemplateData",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosApi.post(`${emailLists}`, data);
      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

// --------Edit Data---------
export const EditEmailData = createAsyncThunk(
  "template/EditTemplateData",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const id = "id";
    try {
      const res = await axiosApi.post(`${emailLists}/${id}${update}`, data);
      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

// -------Delete Data--------
export const DeleteEmailData = createAsyncThunk(
  "template/DeleteTemplateData",
  async (idData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosApi.delete(`${emailLists}/${idData}`);
      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

// -------Get Data By Id--------
export const getEmailDataByID = createAsyncThunk(
  "template/getTemplateData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const id = "id";
    try {
      const res = await axiosApi.get(`${emailLists}/${id}`);

      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

interface initialState {
  gettemplates: string[];
  gettemails: string[];
  gettemplatesById: {
    name?: string;
    customers?: string;
  };

}

const initialState: initialState = {

  From: "",
  Subject: "",

  gettemplatesById: {},
};

const TemplateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(getTemplateData.fulfilled, (state, action) => {
      state.gettemplates = action.payload;
    });

    builder.addCase(addEmailData.fulfilled, (state, action) => {
      state.gettemails = action.payload;
    });
    builder.addCase(EditEmailData.fulfilled, (state, action) => {
      state.gettemails = action.payload;
    });
    builder.addCase(
      DeleteEmailData.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.gettemails = state.gettemails.filter(
          (i) => i.id !== action.payload
        );
      }
    );
    builder.addCase(getEmailDataByID.fulfilled, (state, action) => {
      state.gettemplatesById = action.payload;
    });
  },
});

export default TemplateSlice.reducer;

