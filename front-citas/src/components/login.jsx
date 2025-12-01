import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error400 from "./errors/error400";

function Login(){

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [errorMsg, seterrorMsg] = useState(null)
    const navi = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
       const apiURL = 'http://127.0.0.1:8000/api/v1/users';
           const body = document.querySelector("body");
           const options = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   username: user,
                   password: pass
               })
           };
       
           fetch(apiURL, options)
               .then(response => {
                   if (!response.ok) throw new Error(response.status);
                   return response.json();
               })
               .then(data => {
                   console.log(data);
                   if (data.code === '200'){
                    localStorage.setItem("data", JSON.stringify(data));
                    navi("/Dashboard");
                   } else{
                    seterrorMsg(data.msg);
                   }
               })
               .catch(err => {
                   console.error("ERROR:", err);
               });
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor=""> Usuario <br />
                    <input type="text" onChange={(e) => setUser(e.target.value)}/><br />
                </label>
                <label htmlFor=""> Contraseña <br />
                    <input type="text" onChange={(e) => setPass(e.target.value)}/>
                </label><br />
                <button type="submit">Iniciar Sesión</button>
                {errorMsg && <Error400 msg={errorMsg} />}
            </form>
        </div>
    )
}

export default Login;