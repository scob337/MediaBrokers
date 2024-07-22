import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CUSTOMERS, axiosApi, emailLists, emailEdit } from "../../Api/Api";




interface initialState {
  getLists: string[];
  getCustomers: string[];
  getListsById: {
    name?: string;
    id?: string;
    customers?: string;
  };
  addCustomers: [];
  editCustomers: [];
  ISUpdate: "EDIT" | "ADD";
  SingleTemplate: {};
  SingleTemplateInfo: "";
  SelectorEmails: string[];
  FilterItem:{Address:string , HasCompany:string , HasPayment:string , Tags:string}
}

const initialState: initialState = {
  getLists: [],
  getListsById: {},
  addCustomers: [],
  editCustomers: [],
  getCustomers: [],
  ISUpdate: "ADD",
  SingleTemplate: {},
  SingleTemplateInfo:"",  
  SelectorEmails: [],
  FilterItem:{
    Address:"",
    HasCompany: "",
    HasPayment:"" ,
    Tags:""
  }
};









// -------Get Data--------
export const getEmailData = createAsyncThunk(
  "lists/getEmailData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosApi.get(`${emailLists}`);
      return res.data.Email_lists;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

// --------Add Data---------
export const addEmailData = createAsyncThunk(
  "lists/addEmailData",
  async (name, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const customers = getState().lists.addCustomers;
      const res = await axiosApi.post(`${emailLists}`, {
        name: name,
        customers: customers,
      });
      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);
export const editEmailData = createAsyncThunk(
  "lists/editEmailData",
  async (data, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { name, customers } = data;
    try {
      const id = getState().lists.getListsById.id;
      const res = await axiosApi.post(`${emailLists}/${id}${emailEdit}`, {
        name: name,
        customers: customers,
      });
      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);
// --------Edit Data---------

// -------Delete Data--------
export const DeleteEmailData = createAsyncThunk(
  "lists/DeleteEmailData",
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
  "lists/getEmailDataByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {

      const res = await axiosApi.get(`${emailLists}/${id}`);
      return res.data.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);
export const getCustomersData = createAsyncThunk(

  "lists/getCustomersData",
  async (_, thunkAPI) => {
    const { rejectWithValue , getState} = thunkAPI;
    try {
      const {Address , HasCompany , HasPayment , Tags} = getState().lists.FilterItem;

      const res = await axiosApi.get(`https://mediabrokers.lcisoft.it/api/v1/customers?address=${Address}&has_companies=${HasCompany}&has_payments=${HasPayment}&tags=${Tags}`);
      return res.data.customers;
    } catch (error: unknown) {
      const errorData = error as Error;
      console.log(errorData.message)
      return rejectWithValue(errorData.message);
    }
  }
);



const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    AddCustomer: (state, action) => {
      if (!state.addCustomers.includes(action.payload)) {
        state.addCustomers.push(action.payload);
      }
    },
    AddAllCustomer: (state, action) => {

        state.addCustomers = action.payload;
      
    },
    deselectPerson: (state, action) => {
      state.addCustomers = state.addCustomers.filter(
        (id) => id !== action.payload
      );
    },

    deselectPersonAll:(state)=>{
      state.addCustomers = [];
    },
    ISUpdate: (state, action) => {
      state.ISUpdate = action.payload;
    },
    SaveTemplate(state, action) {
      state.SingleTemplate = action.payload;
    },
    GetTemplateInfo(state, action) {
      state.SingleTemplateInfo = action.payload;
    },
    SelectingEmails(state, action) {
      state.SelectorEmails = action.payload;
    },
    SingleTemplateInfofrom(state, action) {
      state.SingleTemplateInfo.from  = action.payload;
    },
    SingleTemplateName(state, action) {
      state.SingleTemplateInfo  = action.payload;
    },

    ChangeCustomerFilterAddress(state, action) {
      state.FilterItem.Address = action.payload;
    },
    ChangeCustomerFilterCompany(state, action) {
      state.FilterItem.HasCompany = action.payload;
    },
    ChangeCustomerFilterPayment(state, action) {
      state.FilterItem.HasPayment = action.payload;
    },
    ChangeCustomerFilterTags(state, action) {
      state.FilterItem.Tags = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getEmailData.fulfilled, (state, action) => {
        state.getLists = action.payload;
      })
      .addCase(addEmailData.fulfilled, (state, action) => {
        state.getLists = [...state.getLists, action.payload];
      })
      .addCase(editEmailData.fulfilled, (state, action) => {
        state.getLists = [...state.getLists, action.payload];
      })

      .addCase(
        DeleteEmailData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.getLists = state.getLists.filter(
            (i) => i.id !== action.payload
          );
        }
      )
      .addCase(getEmailDataByID.fulfilled, (state, action) => {
        state.getListsById = action.payload;
      })
      .addCase(getCustomersData.fulfilled, (state, action) => {
        state.getCustomers = action.payload;
      });
  },
});
export const {
  SaveTemplate,
  AddCustomer,
  AddAllCustomer,
  deselectPerson,
  ISUpdate,
  SelectingEmails,
  SingleTemplateName,
  deselectPersonAll,
  ChangeCustomerFilterAddress,
  ChangeCustomerFilterCompany ,
  ChangeCustomerFilterPayment,
  ChangeCustomerFilterTags,
 
} = listsSlice.actions;
export default listsSlice.reducer;
