import React, { useState,useEffect } from 'react';
import {  Form, FormGroup, Label, Input, } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Login.css';
import axios from 'axios';

import { Card } from '@mui/material';
import AndroidButton from './AndroidButton';
import LoginIcon from '@mui/icons-material/Login';

function Signup() {
    const navigate= useNavigate();

  // Define state variables to hold form data
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const API = axios.create({
//         withCredentials: true,
//       });

//       try {
//         const res = await API.post('/auth/loggedIn');
//         if (res.data.data) {
//           navigate('/dashboard');
          
//         }
//       } catch (err) {
//         navigate('/login');
//       }
//     };

//     checkAuthentication();
//   }, [ navigate ]);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if(!name || !password || !email) {
     
      if (!name) {
      document.getElementById('name').focus();
      toast.error('Please Enter name');
    }
    else if (!email) {
      document.getElementById('email').focus();
      toast.error('Please Enter Email');
    }
    else if (!password) {
      document.getElementById('password').focus();
      toast.error('Please Enter Password');
    }

      return;
    }
    console.log(name, password, email);

    // Create a data object to send to the server
    const data = {
      name,
      email,
      password,

    };

    try {
      // Send a POST request to the backend endpoint for authentication
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check the response status
      // console.log(response);
      if (response.ok) {
        // Authentication successful, you can redirect or perform other actions here
    
     // Authentication successful, extract data from the response
     const responseData = await response.json();
    
     // Now you can access properties from responseData
     const name = responseData.name;
    //  const role = responseData.role;
 
        // console.log(name);
       
        // toast.success("Login Successful");
        toast(`Welcome ${name} ! Please Login`);
        navigate('/login');


      } else if(response.status === 401) {
        // Authentication failed, handle the error
        toast.error('Wrong Credentials');
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong :( ');
    }
  };

  return (
    <Card className='loginCard mt-5'>
    <div className='log' >
      <h2>New User Sign Up</h2>
      <Form  className='login' onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            id=""
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="">Email Id:</Label>
          <Input
            type="email"
            id="name"
            placeholder="Enter Your Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password :</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        
        <AndroidButton color="green" text="Sign Up" fun={handleSubmit} icon={<LoginIcon size={24} />} />
      </Form>
    </div>
    </Card>
  );
}

export default Signup;
