import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface User {
    id: number;
    name: string;
    age: number;
    city: string;
    state: string;
    pincode: string;
};

function UserList() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${API_URL}/api/users`).then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch users.");
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            toast.error(error.message || "An error occured");
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                    <p className="mt-2 text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    if (users.length==0){
        return <p className="text-center text-gray-500">No users found.</p>;
    }
    return (
    <>
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
            <tr>
            <th className="p-2">Id</th>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">City</th>
            <th className="p-2">State</th>
            <th className="p-2">Pincode</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (<tr key={user.id}>
            <td className="p-2">{user.id}</td>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.age}</td>
            <td className="p-2">{user.city}</td>
            <td className="p-2">{user.state}</td>
            <td className="p-2">{user.pincode}</td>
            </tr>))}
        </tbody>
       </table>
       <Toaster position="top-right" />
    </>
    )
}

export default UserList;