const express = require('express');
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");
const mongoose = require('mongoose');
const Question = require('./models/Questions');
const Topics = require('./models/Topics');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const connectToMongoDB = require('./mongoConnection');




const authRoutes = require('./routes/authRoutes'); // Adjust the path based on your project structure


const app = express();
app.use(fileUpload());
const openai = new OpenAI({
    apiKey: "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",
  });
///////////////////////////////////////////////////////////////////
connectToMongoDB();
///////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
///////////////////////////////////////////////////////////////////

// Middleware to parse JSON, URL-encoded data and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////

app.use('/auth', authRoutes);




app.post("/extract-text", async (req, res) => {
  try {
    if (!req.files || !req.files.pdfFile) {
      res.status(400).end();
      return;
    }
    const topic = req.body.topic;
    console.log(topic);

    const pdfText = await pdfParse(req.files.pdfFile);
    // console.log(pdfText.text.length);
    const cleanedText = pdfText.text.replace(/\s+/g, ' ').trim();

    // console.log(cleanedText);
    // console.log(cleanedText.length);

    const wordCount = cleanedText.split(/\s+/).length;
    console.log(wordCount);
    let topic1 = null;
   try{
 topic1 =await Topics.create({topic: topic});
} catch (error) {
  console.error(error);
  res.send("Topic already exists");
}

      const num = 10;
    let generatedQuestions = 0;
    let totalQuestions = 0;
   do {
     generatedQuestions = await getMcqs(cleanedText,topic1.topic);
    totalQuestions += generatedQuestions;
    console.log(generatedQuestions);
    } while (totalQuestions < num);
   

    // console.log((generatedQuestions ? generatedQuestions: 0) + ' questions generated successfully!');
console.log("Done !")

const topicWiseQuestions = await Topics.findOne({ topic: topic1.topic })
  .populate({
    path: 'mcqs',
    model: 'Question', // Replace 'Question' with the actual model name for questions
    select: 'question options answer -_id', // Adjust the fields you want to include
    options: { lean: true }, // Set the lean option to true

  })
  .select('topic mcqs -_id'); // Adjust the fields you need


// console.log(topicWiseQuestions);

res.send(topicWiseQuestions);
  } catch (error) {
    console.error(error);
    // res.send("Topic already exists");
  }
});



const getMcqs = async (text,topic) => {
    // Explicitly instruct the model to generate multiple-choice questions

    const prompt = `Generate/extract a set of diverse MCQs from the following text in format like: [{"question": "Question here...", "options": ["Option1", "Option2", "Option3", "Option4"], "answer": "Correct Option here."}]\n${text}`;

// const prompt = `Generate/extract a set of diverse true/false MCQs from the following text in format like: [{"question": "Question here...", "options": ["Option1", "Option2"], "answer": "Correct Option here."}]\n${text}`;

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo-0125",
  user: "user-1234",
  messages: [
    {
      "role": "user",
      "content": prompt,
    },
  ],
  temperature: 1,
  max_tokens: 4096,
  top_p: 1,

});

const generatedQuestions = JSON.parse(response.choices[0].message.content);
// console.log(generatedQuestions);
return await saveToDatabase(generatedQuestions,topic);

}
const saveToDatabase = async (final,topic) => {
  
    try {
      if (final) {
      
    const questions = await Question.insertMany(final);
        console.log(questions.length + ' Data saved to the database successfully!');
   // Extract question IDs
   const questionIds = questions.map(question => question._id);
  
   // Update the Topics collection with question IDs
   await Topics.updateMany({topic: topic}, { $addToSet: { mcqs: { $each: questionIds } } });
   
   return questions.length;
      }
      else {
        console.log('No data to save to the database.');
      }
    } catch (error) {
      console.error('Error saving data to the database:', error);
      
    } finally {
      // Disconnect from the database
      // mongoose.disconnect();
    }
  
  };
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});