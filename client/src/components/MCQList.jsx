import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const MCQList = ({ mcqs }) => {
  return (
    <div>
      {mcqs.map((mcq, index) => (
        <Card key={index} className="m-3">
          <CardBody>
            <CardTitle tag="h5">{mcq.question}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Options:</CardSubtitle>
            <ul>
              {mcq.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
            <CardText>Answer: {mcq.answer}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default MCQList;
