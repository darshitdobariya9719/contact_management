import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactsState {
  data: Contact[];
}

const initialState: ContactsState = {
  data: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.data = action.payload;
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.data.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const updatedContact = action.payload;
      const index = state.data.findIndex((c) => c.id === updatedContact.id);
      if (index !== -1) {
        state.data[index] = updatedContact;
      }
    },
    deleteContact(state, action: PayloadAction<number>) {
      state.data = state.data.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
