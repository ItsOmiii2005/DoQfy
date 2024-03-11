
import { Logoutbutton } from './Logout';
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import Image from "react-bootstrap/Image";
import '../styles/Dashboard.css';

import { Link } from 'react-router-dom';
import img from '../images/DoqfyLogo.png';


import '../styles/imageStyle.css';
import { useDarkMode } from '../DarkModeContext';
import Quizimgage from '../images/quiz_ludo.jpg';



  const Dashboard = (props) => {

  const { isDarkMode } = useDarkMode();
  const userData = props.userData;
  
// const navigate = useNavigate();
const name = userData.name;
const role = userData.role;

console.log(userData.role);
const cardSub=(
  <CardSubtitle
  className={`mb-2 ${!isDarkMode ? 'text-warning' : 'text-muted'}`}
  tag="h6"
>
  ...By DocQFy
</CardSubtitle>
)

  return (
    <div >

<div className="img">
      <Image src={img} className="logo" />
    
     
      </div>
<h2 align="center" className='bg-dark text-white w-75 mx-auto mt-2 border hi'>Hello {name ? name: ''}  !!!</h2>


      <CardGroup className='cardgroup' >

        <div className ='div ' sx={{ display: 'flex' }} >

          <Card className='dashcard '>
            <CardImg
              alt="Multiple Choice Question"
             src={Quizimgage}
              top
              width="100%"
              
            />
            <CardBody style={{backgroundColor: !isDarkMode ? 'black' : 'white', color: !isDarkMode ? 'white' : 'black'}}>
              <CardTitle tag="h5" className='hi'>
                Quiz generation
              </CardTitle>
             {cardSub}
              <CardText>
               The DocQFy is a Project/Product By Students of VAPM Collage of Polytechnic, Latur.
               <br />
               Presenting You Our vision subjective to providing Multiple choice questions based on document you uploaded <br />
               
              </CardText>
             <Link to='/dashboard/createmcq'>
              <Button className='bg-dark'>
              <h4 >
               Quiz generation
              </h4>
            </Button>
            </Link>
            </CardBody>
          </Card>
          <Card className='dashcard m-5 '>
            <CardImg
              alt="Multiple Choice Question"
              src={Quizimgage}
              top
              width="100%"
              
            />
            <CardBody style={{backgroundColor: !isDarkMode ? 'black' : 'white', color: !isDarkMode ? 'white' : 'black'}}>
              <CardTitle tag="h5" className='hi'>
                Quiz Ludo
              </CardTitle>
             {cardSub}
              <CardText>
              
               Presenting You Our Vision, subjective to Gamefied learning through multiple choice questions based on document you uploaded <br />
               
              </CardText>
             <Link to='https://attheendiamthehero.onrender.com'>
              <Button className='bg-dark'>
              <h4 >
               Quiz Ludo
              </h4>
            </Button>
            </Link>
            </CardBody>
          </Card>
        </div>




       

 
      
      </CardGroup>

<div className="logout my-2 mx-auto w-20">

      <Logoutbutton />
      </div>

    </div>
  );
}

export default Dashboard;




