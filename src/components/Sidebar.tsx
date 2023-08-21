import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsList } from "react-icons/bs";
interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Assuming 768px as the breakpoint
    };

    handleResize(); // Initialize isOpen based on the initial viewport width

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsSidebarOpen]);

  const toggleDrawer = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className={`fixed h-screen w-${window.innerWidth < 768?'full':'80'} bg-blue-600 text-white transition-transform duration-300 ${isSidebarOpen ? 'transform translate-x-0' : '-translate-x-full'}`} style={{zIndex:1}}>
      <div className="p-4 border-b border-blue-700 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Contact Management</h1>
        <button
              className="md:hidden text-2xl text-gray-600"
              onClick={toggleDrawer}
            >
              {isSidebarOpen ? <AiOutlineClose /> : <BsList />}
            </button>
      </div>
      <ul className="mt-2">
        <li className="px-4 py-2 hover:bg-blue-700">
          <Link to="/contacts" onClick={toggleDrawer}>
            Contacts
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-blue-700">
          <Link to="/mapandchart" onClick={toggleDrawer}>
            Chart And Maps
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
