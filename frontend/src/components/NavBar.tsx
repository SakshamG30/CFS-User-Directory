// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              User Directory
            </Link>
          </div>
          
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900"
            >
              User List
            </Link>
            <Link 
              to="/add" 
              className="text-gray-600 hover:text-gray-900"
            >
              Add User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;