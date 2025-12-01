import { use } from "react";
import { useNavigate } from "react-router-dom";

function Aside(){
    const dataUser = JSON.parse(localStorage.getItem("data"));
    const {permisos, user} = dataUser;
    const navigate = useNavigate();

    console.log(dataUser)
    function mostrarComponente(name){
        navigate(`/Dashboard/${name}`)
        localStorage.setItem("window", name)
    }

    function mostrarCitas(rol, citas){

    }
    
    return(
        <aside>
            <section>
                <h1>Bienvenido! {user.Name}</h1>
            </section>
            <nav>
                {permisos.map(p=>(
                    <button key={p.PermissionID} onClick={(e) => mostrarComponente(p.PermissionName)}>
                        {p.PermissionName}
                    </button>
                ))}
            </nav>
        </aside>
    )
}
export default Aside;