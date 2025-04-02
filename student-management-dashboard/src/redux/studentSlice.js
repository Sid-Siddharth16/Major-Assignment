import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [], 
};

const studentSlice = createSlice({
  name: "students",
  initialState, 
  reducers: {
    addStudent: (state, action) => {
      state.students = [action.payload, ...state.students]; 
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
  },
});

export const { addStudent, deleteStudent, updateStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
