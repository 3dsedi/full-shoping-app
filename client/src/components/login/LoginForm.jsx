import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';



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
        <p className='login_form_p'>Login</p>
        <form onSubmit={userLoginHandler} className={"login_form"} >
          <input  placeholder="email" id="email_input" ref={emailRef}/>
          <br/>
          <input type="password" placeholder="password" id="password_input" ref={passRef} />
          <br/>
          <input type={'submit'}/>
        </form>
      </>
  )
}

export default LoginForm;