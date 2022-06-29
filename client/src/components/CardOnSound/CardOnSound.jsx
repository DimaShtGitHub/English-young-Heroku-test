import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OneCard from './OneCard/OneCard';
import styles from './CardOnSound.module.css'
import Container from '@mui/material/Container';
import {useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Cards() {

  const navigate = useNavigate();
  const [arrCard, setArrCard] = useState();


  useEffect(() => {
    axios.get('/topic/card')
      .then((data) => setArrCard(data.data))
  }, [])

  return (
    <div className={styles.Home}>
{arrCard.length > 0 ? (
  <div>
  <Container className={styles.Container}>
    {arrCard?.map(el => <OneCard topic={el} key={el.id} />)}

    <Card className={styles.Card} onClick={() => navigate(`/sound/random`, { replace: true })}>
      <CardActionArea className={styles.Area}>
        <img className={styles.Img}
          src='/img/Tree.png'
          alt='загрузка'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Random
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Container>
  </div>
):(<div className="spinner-grow text-danger" role="status">
<span className="visually-hidden">Загрузка...</span>
</div>)}</div> 
  )
}
