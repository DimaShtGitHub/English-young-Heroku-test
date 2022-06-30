import styles from './Translate.module.css'
import React from 'react'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { useSelector } from 'react-redux';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LinearProgress from '@mui/material/LinearProgress';

export default function Translate() {

const [language, setLanguage] = useState('');
const [input, setInput] = useState('')
const [answer, setAnswer] = useState('')

const changeLang = (event) => {
setLanguage(event.target.value)
}

const inputsHandler = (event) => {
  event.preventDefault();
  setInput(event.target.value)
}


const whireWord = (event) => {
  event.preventDefault();

const encodedParams = new URLSearchParams();
encodedParams.append("q", input);
encodedParams.append("source", language);
if(language === 'ru') {
  encodedParams.append("target", "en");
} else {
  encodedParams.append("target", "ru");
}

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    // 'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': 'fee7472500msh53d76535f9ca275p1f4e12jsnebb2bcc9b046',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams
};

axios.request(options).then(function (response) {
	console.log(555, response.data.data.translations[0].translatedText);
setAnswer(response.data.data.translations[0].translatedText)
}).catch(function (error) {
	console.error(error);
});
}

const sound = useSelector((state) => state.sound)
const talk = () => {
  if (sound) {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(answer);
     synth.speak(utterThis);
  }
}

  return (
    <>
<div className={styles.Home}>

   <div className={styles.Cont}>

    <div>
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Выберите язык</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="ru" onClick={changeLang} control={<Radio />} label="Русский" />
        <FormControlLabel value="en" onClick={changeLang} control={<Radio />} label="Английский" />
      </RadioGroup>
    </FormControl>

    <Box onSubmit={whireWord} component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '80vh' },
      }}
      noValidate
      autoComplete="off">
     <div className={styles.Inp}>
        <TextField onChange={inputsHandler} name="word" label="Напишите слово" id="outlined-size-normal" />
     </div>

     <Button variant="text" type="submit">Перевести</Button>
   </Box>  

   </div>
   <div>
    <>
{answer?.length > 0 ? (
  <Typography variant="h3" gutterBottom component="div">
    <VolumeUpIcon onClick={talk}/>
  {answer}
     </Typography>
):(
  <Box sx={{ width: '100%' }}>
  <LinearProgress />
</Box>
)}
  </> 
   </div>

  </div>

    </div>
    </>

  )
}
