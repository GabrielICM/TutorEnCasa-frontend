import { useState} from "react";
import api from '../../Servicios/Peticion';

const useSession = () => {

    const [modificarEmail,setmostrarEmail] = useState(false);
    const [modificarContraseña, setmostrarContraseña] = useState(false);

api('PUT','/user/profile',modContraseña,{ 'access-token': token })
    .then((res)=>{
        if(res.status =='succes'){
            alert('Modificado!');
            
        }else{
            alert('Error!');
            console.log(res.error);
        }
}
)

api('PUT','/user/profile',modHotmail,{ 'access-token': token })
    .then((res)=>{
        if(res.status =='succes'){
            alert('Modificado!');
            
        }else{
            alert('Error!');
            console.log(res.error);
        }
}
)

    return (modificarContraseña,modificarEmail)
};

export default useSession;