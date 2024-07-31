import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const thisContext = useContext(AuthContext);
    if(!thisContext) {
        throw Error('Error invoking context');
    }
    return thisContext;
}