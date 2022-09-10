import React from 'react'
import "../Styles/Register.css";
import logopdf from "../Images/PDF.png";

export default function Register() {
  return (
    <div>
      <form className="Containter">
        <div className="DataUser">
          <label className="Datauser_Label" for="username">
            Username
            <input className="Datauser_Input" type="text" name="username" id="username" />
          </label>

          <label className="Datauser_Label" for="Umail">
            Email <input className="Datauser_Input" type="email" name="Umail" id="Umail" />
          </label>
          <label className="Datauser_Label" for="Upass">
            Password <input className="Datauser_Input" type="password" name="Upass" id="Upass" />
          </label>
          <label className="Datauser_Label" for="CUpass">
            Confirm Password <input className="Datauser_Input" type="password" name="CUpass" id="CUpass" />
          </label>

          <div className="userImage">
            <div className="userImagePreview">
              <input type={"file"} />
              <figure>
                <img id="preview" src={logopdf} alt="logo" />
              </figure>
              <input type={"submit"} value="Submit" />
            </div>
            <div className="userImageSubmit">
              <button>Registrar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
