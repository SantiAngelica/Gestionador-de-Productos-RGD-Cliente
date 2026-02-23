import { Navigate } from "react-router";
import { HasRole, isAuthenticated } from "../../Helpers/IsAuthenticated";

const Protected = ({ children, needingRole }) => {
    let auth = isAuthenticated();

    if (!auth ||(needingRole && !HasRole(needingRole))) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default Protected;