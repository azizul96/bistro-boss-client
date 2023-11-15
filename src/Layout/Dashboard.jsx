import { FaBars, FaBook, FaCalendar, FaHome, FaList, FaMailBulk, FaShoppingBag, FaShoppingCart, FaStar, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex gap-3">
            <div className="w-64 min-h-screen bg-orange-400">
                <h2 className="text-3xl font-bold p-4">Bistro Boss <br /> Restaurant</h2>
                <ul className="menu p-4">
                    {
                        isAdmin ? 
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems"><FaUtensils />Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageBookings"><FaBook />Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers"><FaUsers/> All Users</NavLink>
                            </li>
                        </> 
                        :
                        <>
                            <li>
                            <NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reservation"><FaCalendar />Reservation</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review"><FaStar />Review</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/booking"><FaBook/> Bookings</NavLink>
                            </li>
                        </>
                    }

                    <div className="divider"></div>
                    {/* common menu items */}
                    <li>
                        <NavLink to="/"><FaHome />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu"><FaBars />Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><FaShoppingBag />Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"><FaMailBulk />Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;