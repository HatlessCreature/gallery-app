import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout, selectActiveUser, selectIsAuthenticated} from "../store/auth";

export default function NavBar(){
    const activeUser = useSelector(selectActiveUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    function handleLogout(){
        dispatch(logout());
    }

    return (
        <div>
            <nav>
                {isAuthenticated ? (
                    <h4>
                        User: {activeUser && activeUser.first_name} {activeUser && activeUser.last_name}  
                    </h4>
                ) : (
                    <h4>
                        Guest
                    </h4>
                )}
                <li>
                    <Link to="/">All Galleries</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/galleries/me">My Galleries</Link>
                        </li>
                        <li>
                            <Link to="/galleries/create">Create Gallery</Link>
                        </li>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </nav>
        </div>
    );
}