import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-800">
                            User Directory
                        </Link>
                    </div>
                    
                    <div className="flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">User List</Link>
                        <Link to="/add" className="text-gray-600 hover:text-gray-900">Add User</Link>
                        
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-gray-600">{user?.email}</span>
                                <button 
                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={() => loginWithRedirect()}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;