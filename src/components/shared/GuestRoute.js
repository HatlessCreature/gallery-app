import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated} from "../../store/auth";

export default function PrivateRoute({ children, ...props }){
    const isGuest = !useSelector(selectIsAuthenticated);

    return (
        <Route {...props}>
            {isGuest? children : <Redirect to="/"/>}
        </Route>
    )
}