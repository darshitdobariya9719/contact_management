import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import EditContactForm from './components/EditContactForm';
import { AiOutlineClose } from 'react-icons/ai';
import { BsList } from 'react-icons/bs';
import GlobalCasesGraph from './components/ChartPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  // Update sidebar state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Assuming 768px as the breakpoint
    };

    handleResize(); // Initialize isOpen based on the initial viewport width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className="flex flex-col min-h-screen  flex-grow bg-gray-100">
          <div className="flex items-center justify-between p-4 bg-white border-b">
            <button
              className="md:hidden text-2xl text-gray-600"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <AiOutlineClose /> : <BsList />}
            </button>
            <h1 className="text-2xl font-semibold mr-5">Contact Management</h1>
          </div>
          <div
            className={`flex-grow p-4 transition-all duration-300`}
            style={{
              marginLeft: `${
                window.innerWidth < 768 ? '0rem' : '19rem'
              }`,
            }}
          >
            <Routes>
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/add" element={<ContactForm />} />
              <Route path="/edit/:contactId" element={<EditContactForm />} />
              <Route path="/mapandchart" element={<GlobalCasesGraph/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
