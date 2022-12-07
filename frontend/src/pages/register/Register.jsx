import { Button, Form, Input, message } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "../login/Login.css"

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    console.log(value)
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/profile/register', value);
      message.success("Register Successfully!");
      navigate("/");
      dispatch({
        type: "HIDE_LOADING",
      });
      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!")
      console.log(error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);


  return (
    <div className='form'>
        <h2>ARTAFILA POS</h2>
        <p>Register</p>
        <div className="form-group">
          <Form layout='vertical' onFinish={handlerSubmit}>
            <FormItem name="name" label="Name">
              <Input/>
            </FormItem>
            <FormItem name="email" label="Email">
              <Input/>
            </FormItem>
            <FormItem name="password" label="Password">
              <Input type="password"/>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new-regis' onClick={()=> navigate('/')}>Register</Button> 
              <Link className='form-other-regis' to='/'>Login Here!</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Register