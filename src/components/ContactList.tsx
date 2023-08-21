import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { Contact } from "../types";
import { deleteContact } from "../store/contactsSlice";

const ContactList: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.data);

  const handleDeleteContact = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="p-4">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl mb-4">Contact List</h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Add Contact
        </Link>
      </div>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact: Contact) => (
            <div className="w-full md:w-1/2 lg:w-full max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">status:</span>
                  {contact.status}
                </p>
              </div>
              <div className="flex justify-between m-2 mb-0">
                <Link
                  to={`/edit/${contact.id}`}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4">
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
