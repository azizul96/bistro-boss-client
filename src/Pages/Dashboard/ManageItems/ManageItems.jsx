import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxios()

    const handleDeleteItem = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                // console.log(res.data);
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                      });
                }
              
            }
          });
    }


    return (
        <div>
            <div>
                <SectionTitle heading="Manage Items" subHeading="Hurry Up"></SectionTitle>
            </div>
            <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Image</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        menu.map((item, index) => <tr key={item._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                </div>
                                </div>
                                
                            </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                ${item.price}
                            </td>
                            <td>
                                <Link to={`/dashboard/updateItem/${item._id}`}>
                                <button  className="btn btn-ghost btn-xs text-green-700 text-xl "><FaEdit /></button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={()=> handleDeleteItem(item)} className="btn btn-ghost btn-xs text-red-700 text-xl"><FaTrash /></button>
                            </td>
                        </tr>)
                    }
                    </tbody> 
                </table>
            </div>
            </div>
        </div>
    );
};

export default ManageItems;