import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store'; // Make sure to export AppDispatch
import { setContacts } from '../store/contactsSlice';
import { Contact } from '../types';

export function useContacts() {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.data);

  const updateContacts = (updatedContacts: Contact[]) => {
    dispatch(setContacts(updatedContacts));
  };

  return { contacts, updateContacts };
}
