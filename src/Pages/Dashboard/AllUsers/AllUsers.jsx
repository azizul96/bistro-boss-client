import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaTrash, FaUserShield, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AllUsers = () => {
    const axiosSecure = useAxios()

    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                toast.success('This user is admin now!')
            }
        })
    }

    const handleDeleteUser = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              
            axiosSecure.delete(`/users/${user._id}`)
            .then(res =>{
                // console.log(res);
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }
            })
            }
          });
    }


    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-2xl font-bold">All Users</h2>
                <h2 className="text-2xl font-bold">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-amber-300">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => 
                            <tr key={user._id}>
                                <th>{index +1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? 
                                        <button className="btn btn-ghost btn-sm text-green-700 text-xl"><FaUserShield /></button> 
                                        :
                                        <button onClick={()=> handleMakeAdmin(user)} className="btn btn-ghost btn-sm text-green-700 text-xl"><FaUsers /></button>
                                        
                                    }
                                </td>

                                <td>
                                    <button onClick={()=> handleDeleteUser(user)} className="btn btn-ghost btn-sm text-red-700 text-xl"><FaTrash /></button>
                                </td>
                            </tr>)
                        }
                    
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;