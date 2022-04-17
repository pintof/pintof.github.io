import React, { useState } from "react";

export default function App() {
  const [usernameState, updateUsernameState] = useState();
  const [passwordState, updatePasswordState] = useState();
  const [usernameOnChangeState, updateUsernameOnChangeState] = useState(false);
  const [passwordOnChangeState, updatePasswordOnChangeState] = useState(false);
  const [disabledState, updateDisabledState] = useState(true);

  function onSubmit() {
    updateUsernameState(document.getElementById("username-input").value);
    updatePasswordState(document.getElementById("password-input").value);
  }

  function usernameOnChange() {
    updateUsernameState(document.getElementById("username-input").value);
    updateUsernameOnChangeState(true);
    updateDisabledState(!passwordOnChangeState);
  }

  function passwordOnChange() {
    updatePasswordState(document.getElementById("password-input").value);
    updatePasswordOnChangeState(true);
    updateDisabledState(!usernameOnChangeState);
  }

  return (
    <div>
      <label htmlFor="username-input">Username:</label>
      <input
        type="text"
        id="username-input"
        name="username"
        value={usernameState}
        onChange={usernameOnChange}
      ></input>
      <br></br>
      <label htmlFor="password-input">Password :</label>
      <input
        type="password"
        id="password-input"
        name="password"
        value={passwordState}
        onChange={passwordOnChange}
      ></input>
      <br></br>
      <input
        type="submit"
        id="login-button"
        disabled={disabledState}
        onClick={onSubmit}
      ></input>
    </div>
  );
}
