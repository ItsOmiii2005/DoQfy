import React, { useState } from 'react';
import { Card, CardBody, CardImg, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import MutatingDotsSpinner from './Spinners/MutatingDotsSpinner';
import { useDarkMode } from '../DarkModeContext';
import {  CardTitle, CardText } from 'reactstrap';

import MCQList from './MCQList';
import AndroidButton from './AndroidButton';
import { CloudIcon } from '@primer/octicons-react';




function Upload() {
  const { isDarkMode } = useDarkMode();
  const [resultText, setResultText] = useState([]);
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

const dispMCQs= ()=>{
   let data = resultText;
   console.log(typeof(data));
 
   let arr1 = data.split('question');
   let arr2=[];
   let i;
  for (i = 0; i < arr1.length; i++) {
    console.log("ARRAY 1" + arr1[i]+"<br>");
  }
      

      for (let i = 0; i < arr1.length; i++) {
     arr2[i] = arr1[i].toString().split('options');
      }

      let len = arr2.length;

      for (let i = 0; i < arr1.length; i++){
      console.log("ARRAY 2" + arr2[i]+"<br>");
      }

      let arr3=[];

      for (let i=0;i<arr2.length;i++){
        arr3[i] = arr2[i].toString().split("{\"");
     
      }

      console.log("ARRAY 3" + arr3);
     

}

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  
  const handleUpload = () => {
    if (!file || topic === '') {
      alert('Please select a PDF file and enter a topic');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('topic', topic);

    setLoading(true);

    fetch('/extract-text', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.text())
      .then((extractedText) => {
        // setResultText(extractedText.trim());
        // console.log(extractedText);
        // console.log(typeof extractedText);
        const json = JSON.parse(extractedText);
        console.log(json);
        setResultText(json["mcqs"]);
        console.log(resultText);
        console.log(json["mcqs"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        setLoading(false);
      });
  };
  return (
    <div className='mt-5'>
      <div className="d-flex flex-row">
        <Card className="dashcard m-3">
          <CardBody
            style={{
              backgroundColor: !isDarkMode ? 'black' : 'white',
              color: !isDarkMode ? 'white' : 'black',
            }}
          >
            
            <input type="file" id="inpFile" onChange={handleFileChange} className='m-2' />
          </CardBody>
        </Card>

        <Card className="dashcard mr-3 d-flex align-items-center justify-content-center  ">
          <CardBody
            style={{
              backgroundColor: !isDarkMode ? 'black' : 'white',
              color: !isDarkMode ? 'white' : 'black',
            }}
          >
            <input
        type="text"
        name="topic"
        id="topic"
        required
        className='m-2'
        placeholder="Enter topic*"
        value={topic}
        onChange={handleTopicChange}
      />
      
      {/* <button type="button" onClick={handleUpload}> submit</button> */}
      <AndroidButton text="Upload" fun={handleUpload} color="green" icon={<CloudIcon size={14} />} />
            {/* Your content for the second card */}
          </CardBody>
        </Card>
      </div>
      {/* <textarea
        // style={{ width: '300px', height: '150px' }}
        // id="resultText"
        // placeholder="Your PDF text will appear here..."
        // value={resultText}
        // readOnly

        style={{ width: '300px', height: '150px' }}
        id="resultText"
        placeholder="Your PDF text will appear here..."
        value={resultText[0].options}
        // onClick={dispMCQs}
        readOnly

      /> */}
      <MCQList mcqs={resultText} />
     
      
      {loading && <MutatingDotsSpinner />}
    </div>
  );
}

export default Upload;
