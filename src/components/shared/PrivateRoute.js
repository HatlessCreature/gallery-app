import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated} from "../../store/auth";

export default function PrivateRoute({ children, ...props }){
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <Route {...props}>
            {isAuthenticated? children : <Redirect to="/login"/>}
        </Route>
    )
}