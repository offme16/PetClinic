import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "shared/api/api";
import axios, { AxiosError } from "axios";

interface addPetData {
  name: string;
  type: string;
  gender: string;
  age: number;
  sterilized: boolean;
  vaccinated: boolean;
  ownerId: string;
}

interface KnownError {
  message: string;
  description: string;
  code: number | undefined;
}

export const addPetPost = createAsyncThunk(
  "addPetPost",
  async (addPetData: addPetData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}Pet/InsertNewPet`, {
        type: addPetData.type,
        gender: addPetData.gender,
        age: addPetData.age,
        sterilized: addPetData.sterilized,
        vaccinated: addPetData.vaccinated,
        name: addPetData.name,
        ownerId: addPetData.ownerId,
      });

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      const error: AxiosError<KnownError> = e as any;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);