import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { updateContact } from '../store/contactsSlice';
import { Contact } from '../types';

const EditContactForm: React.FC = () => {
  const { contactId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contact = useSelector((state: RootState) =>
    state.contacts.data.find((c: Contact) => c.id === parseInt(contactId as string))
  );

  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [status, setStatus] = useState(contact?.status || 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const editedContact = {
      id: parseInt(contactId as string),
      firstName,
      lastName,
      status, // Updated status field
    };
    dispatch(updateContact(editedContact));
    navigate(`/contacts`); // Navigate back to the detail page
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="radio-group space-x-4">
              <label className="radio-label">
                <input
                  type="radio"
                  value="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="radio-input"
                />
                Active
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="inactive"
                  checked={status === 'inactive'}
                  onChange={() => setStatus('inactive')}
                  className="radio-input"
                />
                Inactive
              </label>
            </div>
          </div>
          <div className="flex justify-center">
  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
  Save Changes
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default EditContactForm;
