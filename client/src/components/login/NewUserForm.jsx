import React, { useRef, useState } from "react";
import './NewUserForm.css'


function NewUserForm({addUser}) {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const adminRef = useRef();
  const userRef = useRef();

  const [selectedRole, setSelectedRole] = useState('user');
  // const handleRadioChange = (event) => {
  //   setSelectedRole(event.target.value);
  // }

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);

    if (value === "admin") {
      userRef.current.checked = false;
    } else {
      adminRef.current.checked = false;
    }
  };

  const namePlaceholder = selectedRole === 'user' ? 'name' : 'store name';
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
        <p className="signup_p">Sign Up</p>
        <form onSubmit={userSubmitHandler} className={"create_user_form"}>
        <div className="signip_check_box"  >
          <input type="checkbox" id="admin" name="role" value="admin" ref={adminRef} onChange={handleRadioChange} className="check_box_input" />
          <label htmlFor="admin" className="check_box_lable">Admin</label>
          <input type="checkbox" id="user" name="role" value="user" ref={userRef} onChange={handleRadioChange} className="check_box_input"  />
          <label htmlFor="user" className="check_box_lable">User</label>
        </div>
        {/* <input placeholder={selectedRole === 'user' ? "name" : "store name"} id={"name_input"} ref={nameRef}/> */}
        <input placeholder={namePlaceholder} id={"name_input"} ref={nameRef}/>
          <br/>
          <input placeholder={"email"} id={"email_input"} ref={emailRef}/>
          <br/>
          <input placeholder={"password"} id={"password_input"} ref={passwordRef}/>
          <br/>
          <input placeholder={"confirm password"} id={"confirmed_password_input"} ref={confirmRef}/>
          <br/>
          <button className="submit" >Add</button>
        </form>
      </>
  )
}

export default NewUserForm;