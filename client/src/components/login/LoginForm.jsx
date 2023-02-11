import React, { useRef } from "react";

function LoginForm({onLogin}) {
  const emailRef = useRef()
  const passRef = useRef()

  const userLoginHandler = async (event) => {
    event.preventDefault()
    const enteredUser = {
       email : emailRef.current?.value,
       password : passRef.current?.value,
    }
    onLogin(enteredUser)
  }
  return (
      <>
        <h3>Login</h3>
        <form onSubmit={userLoginHandler} className={"login_form"}>
          <label htmlFor="email_input">Email</label>
          <input placeholder={"email"} id={"email_input"} ref={emailRef}/>
          <br/>
          <label htmlFor="password_input">Password</label>
          <input placeholder={"password"} id={"password_input"} ref={passRef}/>
          <br/>
          <input type={'submit'}/>
        </form>
      </>
  )
}

export default LoginForm;