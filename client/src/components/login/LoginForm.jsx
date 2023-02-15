import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';




function LoginForm({onLogin}) {
  const emailRef = useRef()
  const passRef = useRef()
  const navigate = useNavigate()

  const userLoginHandler = async (event) => {
    event.preventDefault()
    const enteredUser = {
       email : emailRef.current?.value,
       password : passRef.current?.value,
    }
    // onLogin(enteredUser)
    const userData = await onLogin(enteredUser)
    console.log(userData.user.role)
    const role = userData.user.role
    if(role === 'user') {
      navigate('/products')
    }else if (role === 'admin') {
      navigate('/store') 
    } else if (role === 'superadmin'){
     navigate('/admin/super')
    }
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