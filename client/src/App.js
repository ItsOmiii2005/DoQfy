import Login from './components/Login';
import { useEffect,useCallback } from 'react';
import { Routes, Route,useLocation } from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import ResponsiveDrawer from './components/ResponsiveDrawer';
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

import { useDarkMode } from './DarkModeContext';
import { ThemeProvider, createTheme } from '@mui/material';
import DarkModeToggler from './components/DarkModeButton/DarkModeToggler';
import Signup from './components/Signup';
import Upload from './components/Upload';

const App = () => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const theme = createTheme({
    palette: {
      mode: !isDarkMode ? 'dark' : 'light',
    },
  })

  // Function to update styles of body and html
  const updateBodyStyles = useCallback(() => {
    document.body.style.background = isDarkMode
      ? 'linear-gradient(45deg, rgb(253, 253, 253), rgb(69, 240, 252))'
      : 'linear-gradient(45deg, rgb(0, 0, 0), rgb(0, 0, 0))';
    document.body.style.color = isDarkMode ? 'black' : 'white';
    document.documentElement.style.background = isDarkMode
      ? 'linear-gradient(45deg, rgb(253, 253, 253), rgb(69, 240, 252))'
      : 'linear-gradient(45deg, rgb(0, 0, 0), rgb(0, 0, 0))';
    document.documentElement.style.color = isDarkMode ? 'black' : 'white';
  }, [isDarkMode]);

  // Call the function when component mounts and when dark mode changes
  useEffect(() => {
    updateBodyStyles();
  }, [isDarkMode,updateBodyStyles]);
  const notShowNavBarPaths = ['/', '/login','/dashboard','/signup'];


  return (
    <div  className="App">
      <ThemeProvider theme={theme}>
            {!notShowNavBarPaths.includes(location.pathname) ? <ResponsiveDrawer /> : <DarkModeToggler /> }

 
{/* <ResponsiveDrawer /> */}
     <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} path="/dashboard" />} />
<Route path='/dashboard/createmcq' element={<ProtectedRoute component={Upload} path="/dashboard" />} />


      </Routes>
      
      <Toaster position="top-right"    toastOptions={{duration: 3000 ,
        style: {
            color: 'black',
            background: 'linear-gradient(45deg, rgb(255, 171, 171), rgb(218, 218, 218))',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            fontFamily: 'times new roman',
  
          }}}/>
</ThemeProvider>
    </div>
  );
}

export default App;
