import { useState} from "react";

const useSession = () => {

    const [mostrarEmail,setmostrarEmail] = useState(false);
    const [mostrarContraseña, setmostrarContraseña] = useState(false);

    const modificarContraseña = () =>{
        setmostrarContraseña(true);
        setmostrarEmail(false);
    } 

    const modificarEmail = () =>{
        setmostrarEmail(true);
        setmostrarContraseña(false);
    }

    return (modificarContraseña,modificarEmail)
};

export default useSession;