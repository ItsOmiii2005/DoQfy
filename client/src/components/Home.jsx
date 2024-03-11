import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Grid, Typography } from '@mui/material';
import Image from "react-bootstrap/Image";
import 'bootstrap/dist/css/bootstrap.css';
import i from '../images/DoqfyLogo.png';
import '../styles/imageStyle.css';
import { ArrowRightIcon } from '@primer/octicons-react';
import AndroidButton from './AndroidButton';

const Home = () => {
  const cardStyle = {
    padding: '20px',
    marginBottom: '20px',
   
  };


  return (
    <div  className=' h-50 m-4' style={{ width:'90%' }}>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "10vh" }}>
        <Image src={i} className="logo my-3" />
      </div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card style={cardStyle}>
              <Typography variant="h4" align="center" style={{fontFamily: 'Times New Roman',}}>Welcome to DocQfy</Typography>
              <Typography variant="subtitle1" align="center" paragraph>Your AI Quiz Generator & Ludo Quizer.</Typography>
              <hr className="my-2" />
              <Typography variant="body1" align="center">
              In this webapp, You will get lots of fun with GAMIFIED LEARNING ~~ Let's Get Entertain with knowledge with DocQfy!!
              </Typography>
              <Link to="/login" style={{ textDecoration: 'none',  }}>
             
        <AndroidButton color='#1e1e1e' text='Go to Login' icon={<ArrowRightIcon size={24} />} />
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none',  }} className='p-3'>
             
        <AndroidButton color='green' text='Sign Up Now !!!' icon={<ArrowRightIcon size={24} />} />
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
