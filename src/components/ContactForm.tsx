import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/contactsSlice';
import { useNavigate } from 'react-router-dom';

const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      firstName,
      lastName,
      status,
    };
    dispatch(addContact(newContact));
    setFirstName('');
    setLastName('');
    setStatus('active');
    navigate('/contacts');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Contact</h2>
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
    Create Contact
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default ContactForm;
