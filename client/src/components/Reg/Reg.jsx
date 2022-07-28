import React from 'react'
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Reg.module.css'

export default function Reg() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  
  const [inputs, setInputs] = useState({})
  const [err, setErr] = useState({})
  const [errInput, setErrInput] = useState([])




  const regHandler = (event) => {
    event.preventDefault();

    
    const loginPattern = /[A-Z0-9a-z]\w+/;
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    

  if (inputs.name?.length > 0 && inputs.email?.length > 0 && inputs.password?.length > 0) {
    if (!loginPattern.test(inputs.name)) {
      setErr({})
      setErrInput('поле "логин" заполнено неверно')
    } else if (!emailPattern.test(inputs.email)) {
      setErr({})
      setErrInput('поле "Email" заполнено неверно')
    } else if (inputs.password?.length < 2) {
      setErr({})
      setErrInput('поле "пароль" заполнено неверно')
    } else {
      setErrInput([])
      axios.post(`/auth/reg`, inputs, {
        withCredentials: true,
      })
      .then((res) => {
          setErr((prev) => ({}))
          dispatch({type: 'SET_USER', payload: res.data})
          navigate("/", { replace: true });
       })
       .catch((res) => {
        if (res.response.status === 400) {
          setErr((prev) => (res.response.data))
        } else if (res.response.status === 500) {
          setErr((prev) => (res.response.data))
        } else {
          setErr((prev) => ({message: 'сервер недоступен, попробуйте позже'}))
        }
       })
    }
  } else {
    setErr({})
    setErrInput('пожалуйста, заполните все поля')
  }

  }

  const inputsHandler = (e) => {
    e.preventDefault();
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value }))
  }


  return (
    <>
<div className={styles.Home}>
    <Box onSubmit={regHandler} 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '80vh' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className={styles.cont}>
      <div>
        <TextField onChange={inputsHandler} name="name" type="text" label="Введите логин:" id="outlined-size-normal" pattern="[A-Z0-9a-z]\w+" minLength="2" placeholder="Заполните поле на английском языке" />
     </div>
     <div>
        <TextField onChange={inputsHandler} name="email" type="email" label="Введите Email:" id="outlined-size-normal" pattern="^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$" placeholder="Пример: name@mail.ru" />
      </div> 
      <div>
        <TextField onChange={inputsHandler} name="password" type="password" label="Введите пароль:" id="outlined-size-normal" minLength="2" placeholder="Длина должна быть больше двух символов"/>
      </div>
      {errInput ? <div className={styles.errMessage}>{errInput}</div> : null}
      {err.message ? <div className={styles.errMessage}>{err.message}</div> : null}
      <Button variant="text" type="submit">Зарегистрироваться</Button>
    </div>
    </Box>
    </div>
</>
  )
}


