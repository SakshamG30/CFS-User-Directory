import { useState } from 'react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

interface LoginModalProps {
    isOpen: boolean;
    onLogin: (username: string) => void;
}

function LoginModal({ isOpen, onLogin }: LoginModalProps) {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!username.trim()) {
            toast.error('Please enter a username');
            return;
        }
        
        try {
            // Get all users and check if username exists
            const response = await fetch(`${API_URL}/api/users`);
            const users = await response.json();
            
            const userExists = users.some(
                (user: any) => user.name.toLowerCase() === username.toLowerCase()
            );
            
            if (userExists) {
                toast.success(`Welcome ${username}!`);
                onLogin(username);
                setUsername('');
            } else {
                toast.error('Username not found');
            }
        } catch (error) {
            toast.error('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md border-4 border-gray-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login Required</h2>
                <p className="text-gray-600 mb-10 text-center">Enter username to add a user</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            autoFocus
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Checking...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;