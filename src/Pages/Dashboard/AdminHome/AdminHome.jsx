import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { FaDollarSign, FaShip, FaUsers, FaUtensils } from "react-icons/fa";


const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxios();

    const {data: stats =[]} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })

    return (
        <div>
            <h2 className="text-3xl font-bold mb-10">
                <span>Hi Welcome </span>
                {
                    user?.displayName ? user.displayName : "Back"
                }
            </h2>
            <div className="stats shadow w-full">
                <div className="stat bg-orange-200">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-2xl"/>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats.revenue}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>
                
                <div className="stat bg-red-200">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-2xl"/>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.users}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>
                
                <div className="stat bg-amber-200">
                    <div className="stat-figure text-secondary">
                        <FaShip className="text-2xl"/>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>

                <div className="stat bg-lime-200">
                    <div className="stat-figure text-secondary">
                        <FaUtensils className="text-2xl"/>
                    </div>
                    <div className="stat-title">Menu Item</div>
                    <div className="stat-value">{stats.menuItems}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;