import React, { useRef } from "react";


function NewUserForm({addUser}) {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const adminRef = useRef();
  const userRef = useRef();

  const userSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredUser = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmed: confirmRef.current?.value,
      role: adminRef.current?.checked ? 'admin' : 'user',
    };
    
    console.log(enteredUser)

    if (passwordRef.current?.value !== confirmRef.current?.value) {
        return;
    }
    addUser(enteredUser)
  }
  return (
      <>
        <h3>Create new user</h3>
        <form onSubmit={userSubmitHandler} className={"create_user_form"}>
          <label htmlFor="email_input">name</label>
          <input placeholder={"name"} id={"name_input"} ref={nameRef}/>
          <br/>
          <label htmlFor="email_input">Email</label>
          <input placeholder={"email"} id={"email_input"} ref={emailRef}/>
          <br/>
          <label htmlFor="password_input">Password</label>
          <input placeholder={"password"} id={"password_input"} ref={passwordRef}/>
          <br/>
          <label htmlFor="confirmed_password_input">Confirm password</label>
          <input placeholder={"confirm password"} id={"confirmed_password_input"} ref={confirmRef}/>
          <br/>
          <label htmlFor="role">Type of User</label>
<div>
  <input type="radio" id="admin" name="role" value="admin" ref={adminRef} />
  <label htmlFor="admin">Admin</label>
  <input type="radio" id="user" name="role" value="user" ref={userRef} />
  <label htmlFor="user">User</label>
</div>
          <br/>
          <button className="submit" >Add</button>
        </form>
      </>
  )
}

export default NewUserForm;