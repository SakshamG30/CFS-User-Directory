import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import LoginModal from "./LoginModal";
import { useAuth0 } from "@auth0/auth0-react";

interface CreateUserRequest {
    name: string;
    age: number;
    city: string;
    state: string;
    pincode: string;
};

function AddUser() {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [showModal, setShowModal] = useState(!isAuthenticated);

    const [formData, setFormData] = useState<CreateUserRequest>({
       name: "",
       age: 0,
       city: "",
       state: "",
       pincode: ""
   });

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        age: "",
        city: "",
        state: "",
        pincode: ""
   });

    const handleLogin = () => {
        setShowModal(false);
    };
   // Helper functions to validate form fields
    const validateName = (name: string): string => {
         if (!name) return "Name is required.";
         if (name.length < 3) return "Name must be at least 3 characters.";
         if (name.length > 100) return "Name must be less than 100 characters.";
         return "";
    };

    const validateAge = (age: number): string => {
         if (!age) return "Age is required.";
         if (age < 0) return "Age cannot be negative.";
         if (age > 120) return "Age must be less than 120.";
         return "";
    }

    const validateCity = (city: string): string => {
            if (!city) return "City is required.";
            return "";
    }

    const validateState = (state: string): string => {
            if (!state) return "State is required.";
            return "";
    }

    const validatePincode = (pincode: string): string => {
            if (!pincode) return "Pincode is required.";
            if (pincode.length < 4) return "Pincode must be at least 4 digits.";
            if (pincode.length > 10) return "Pincode must be less than 10 digits.";
            return "";
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        // Update form data
        if (name === 'name') setFormData({ ...formData, name: value });
        if (name === 'age') setFormData({ ...formData, age: parseInt(value) || 0 });
        if (name === 'city') setFormData({ ...formData, city: value });
        if (name === 'state') setFormData({ ...formData, state: value });
        if (name === 'pincode') setFormData({ ...formData, pincode: value });
        
        // Clear error for this field while user types
        if (name === 'name') setErrorMessage({ ...errorMessage, name: '' });
        if (name === 'age') setErrorMessage({ ...errorMessage, age: '' });
        if (name === 'city') setErrorMessage({ ...errorMessage, city: '' });
        if (name === 'state') setErrorMessage({ ...errorMessage, state: '' });
        if (name === 'pincode') setErrorMessage({ ...errorMessage, pincode: '' });
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameError = validateName(formData.name);
        const ageError = validateAge(formData.age);
        const cityError = validateCity(formData.city);
        const stateError = validateState(formData.state);
        const pincodeError = validatePincode(formData.pincode);

        setErrorMessage({
            name: nameError,
            age: ageError,
            city: cityError,
            state: stateError,
            pincode: pincodeError
        });

          if (nameError || ageError || cityError || stateError || pincodeError) {
            return; 
        }

        const token = await getAccessTokenSilently();

        fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: formData.name,
                age: Number(formData.age),
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
            }),
        }).then(response => {
            if(!response.ok){
                throw new Error("Failed to add user.");
            }
            return response.json();
        }).then(() => {
            toast.success('User added successfully!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }).catch(error => {
            toast.error(error.message || "An error occurred while adding user.");
        });
    }

   return (
    <>
    <div className={showModal ? 'opacity-50 pointer-events-none' : ''}>
       <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Add User Form</h3>
              <div className="p-5 mb-10">
                <div className = "mb-4">
                <div className = "flex items-center">
                    <label className="block text-gray-1000 w-full px-3 py-2" htmlFor ="user-name">Name</label>
                    <input type="text" name="name" id="user-name" value={formData.name} onChange = {handleChange}
                    placeholder = "Enter Name" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errorMessage.name ? 'border-red-500' : 'border-gray-300'
            }`}/>
                </div>
                    {errorMessage.name && <p className = "text-red-500">{errorMessage.name}</p>}
                </div>

             <div className = "mb-4">
                <div className = "flex items-center">
                    <label className="block text-gray-700 w-full px-3 py-2" htmlFor ="user-age">Age</label>
                    <input type="text" name="age" id="user-age" value={formData.age} onChange = {handleChange}
                    placeholder = "Enter Age" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errorMessage.age ? 'border-red-500' : 'border-gray-300'
            }`}/>
                </div>
                    {errorMessage.age && <p className = "text-red-500 m1-1">{errorMessage.age}</p>}  
                </div>

                <div className = "mb-4">
                <div className = "flex items-center">
                    <label className="block text-gray-700 w-full px-3 py-2" htmlFor ="user-city">City</label>
                    <input type="text" name="city" id="user-city" value={formData.city} onChange = {handleChange}
                    placeholder = "Enter City" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errorMessage.city ? 'border-red-500' : 'border-gray-300'
            }`}/>
                </div>
                    {errorMessage.city && <p className = "text-red-500 m1-1">{errorMessage.city}</p>}   
                </div>
                
                <div className = "mb-4">
              <div className = "flex items-center">
                    <label className="block text-gray-700 w-full px-3 py-2" htmlFor ="user-state">State</label>
                    <input type="text" name="state" id="user-state" value={formData.state} onChange = {handleChange}
                    placeholder = "Enter State" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errorMessage.state ? 'border-red-500' : 'border-gray-300'
            }`}/>
                </div>
                    {errorMessage.state && <p className = "text-red-500 m1-1">{errorMessage.state}</p>}
                </div>

                <div className = "mb-4">
                <div className = "flex items-center">
                    <label className="block text-gray-700 w-full px-3 py-2" htmlFor ="user-pincode">Pincode</label>
                    <input type="text" name="pincode" id="user-pincode" value={formData.pincode} onChange = {handleChange}
                    placeholder = "Enter Pincode" className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errorMessage.pincode ? 'border-red-500' : 'border-gray-300'
            }`}/>
                </div>
                    {errorMessage.pincode && <p className = "text-red-500 m1-1">{errorMessage.pincode}</p>}   
                </div>
            </div>

              <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-purple-600 transition-colors">Add User</button>
              </div>
       </form>
       </div>
       <LoginModal isOpen={showModal} onLogin = {handleLogin}/>
       <Toaster position="top-right" />
      </> 
   );
}

export default AddUser;