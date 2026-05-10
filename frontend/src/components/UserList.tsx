import { useState } from "react";
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

    const users: User[] = [
    { id: 1, name: "Alice", age: 28, city: "Boston", state: "MA", pincode: "02101" },
    { id: 2, name: "Bob", age: 35, city: "Seattle", state: "WA", pincode: "98101" },
    { id: 3, name: "Charlie", age: 42, city: "Denver", state: "CO", pincode: "80201" },
    ];


    //const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

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