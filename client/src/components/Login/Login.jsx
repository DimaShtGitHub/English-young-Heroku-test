import React from 'react'
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Login.module.css'


export default function Reg() {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  
  const [inputs, setInputs] = useState({})
  const [err, setErr] = useState({})
  const [errInput, setErrInput] = useState([])

  const loginHandler = (event) => {
    event.preventDefault();

    if (inputs.email?.length && inputs.password?.length) {
      setErrInput([])
      axios.post('http://localhost:3001/auth/login', inputs, {
        withCredentials: true,
      })
      .then((res) => {
          dispatch({type: 'SET_USER', payload: res.data});
          navigate("/", { replace: true });
      })
      .catch((res) => {
        if (res.response.status === 401) {
          setErr((prev) => (res.response.data))
        } else if (res.response.status === 500) {
          setErr((prev) => (res.response.data))
        } else {
          setErr((prev) => ({message: 'сервер недоступен, попробуйте позже'}))
        }
      })
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
    <Box onSubmit={loginHandler} 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '80vh' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className={styles.cont}>
     <div>
        <TextField onChange={inputsHandler} name="email" label="Введите Email:" id="outlined-size-normal" pattern="^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$" placeholder="Пример: aa@mail.ru" />
      </div> 
      <div>
        <TextField onChange={inputsHandler} name="password" type="password" label="Введите пароль:" id="outlined-size-normal" placeholder="Длина должна быть больше двух символов"/>
      </div>
      {errInput ? <div className={styles.errMessage}>{errInput}</div> : null}
      {err.message ? <div className={styles.errMessage}>{err.message}</div> : null}
      <Button variant="text" type="submit">Войти</Button>
    </div>
    </Box>
    </div>
  </>  
  )
}
