import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNewInvite,
  createNewPatient,
  getInvite,
  getPatients,
} from "../api/patients";
import { fakeData } from "../components/dashboard/table/mock_data";

export const getPatientList = createAsyncThunk(
  "patients/getPatients",
  async (token) => {
    return await getPatients(token);
  }
);

export const createPatient = createAsyncThunk(
  "patients/create",
  async (options) => {
    console.log(options);
    return await createNewPatient(options);
  }
);

export const createPatientInvite = createAsyncThunk(
  "patients/createInvite",
  async (options) => {
    return await createNewInvite(options);
  }
);

export const fetchInviteDetails = createAsyncThunk(
  "patients/fetchInvite",
  async (options) => {
    return await getInvite(options);
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: [],
  reducers: {
    setInviteCode: (state, action) => {
      const { patientId, inviteCode } = action.payload;
      return state.map((p) => {
        if (p.id === patientId) p.inviteCode = inviteCode;
        return p;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientList.fulfilled, (_, action) => {
      return action.payload.map((p) => ({
        ...p,
        ...fakeData(),
        weightTrend: Math.random() < 0.5123,
        bpTrend: Math.random() < 0.5123,
        stepsTrend: Math.random() < 0.5123,
      }));
    });
    builder.addCase(createPatient.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(createPatientInvite.fulfilled, (state, action) => {
      const { patientId, inviteCode } = action.payload;
      state = state.map((p) => {
        if (p.id === patientId) p.inviteCode = inviteCode;
        return p;
      });
    });
    builder.addCase(fetchInviteDetails.fulfilled, (state, action) => {
      if (action.payload) {
        const { patientId, inviteCode } = action.payload;
        state = state.map((p) => {
          if (p.id === patientId) p.inviteCode = inviteCode;
          return p;
        });
      }
    });
  },
});

export const getAllPatients = (state) => state.patients;
export const findPatientById = (state, id) =>
  state.patients.find((p) => p.id === id);
export const findPatientByUserId = (state, id) =>
  state.patients.find((p) => p.userId === id);

export default patientSlice.reducer;
