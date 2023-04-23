//Block Start Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
// const LoadEnviormentVariables = require('./configuration/loadMyEnviormentVariables');
const ApplicationConfig = require('./configiration/loadMyEnvFile');
const LoadDataBase = require('./configiration/dataBaseConfig');
//Block End Dependencies


//Block Start Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());
const PORT = process.env.PORT || 7474;
//Block End Intialize the app


//Start Block Setting th Headers for your Application
app.all('*', (req, res, next) => {
  // This is how we protect the api
  res.header('Access-Control-Allow-Origin', '*');// So it make the header allow to the origin when cross platfrom try to exchange the data
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
  }
  next(); //if nothing of the response sent back so next() means other rou
});
//End Block Setting the Header for your Application


//LoadingRoutes in Variable
app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, '/front-end')));
const _exHumanManagementRoutes = require('./Route/exHumanManagementRoute');
//LoadingRoutes in Variable

//Using Routes
app.use('/_exHumanManagementRoutes', _exHumanManagementRoutes);
//Using Routes


//Serving Front End From Express Server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/front-end/index.html'));
  console.log(__dirname);
});
// End Block Checking Routes


//Start Block Checking Routes As express not found Url not Founded we need to do it explicitly 
app.use((req, res, next) => {
  const error = new Error('Url not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  })
});
//End Block Checking Routes As express not found Url not Founded we need to do it explicitly 


app.listen(PORT, () => {
  console.log(`You Application has Launched from the Port 🚀 🚀 ${PORT}`);
})




// const messages = [
//   {
//       "role": "system",
//       "content": "You are a contemplative thesis writer."
//   },
//   {
//       "role": "user",
//       "content": "African Grey Parrot Write an essay on the African Grey Parrot and its unique characteristics. Specifically, its remarkable ability to mimic human speech and the importance of its conservation. Use a formal academic writing style.IntroductionThe African Grey Parrot, known scientifically as Psittacus erithacus, is a medium-sized parrot that is native to the rainforests of West and Central Africa. This species is distinguished by its exceptional ability to mimic human speech fluently and accurately. In this essay, we will explore the various unique characteristics of the African Grey continueParrot, focusing particularly on its speech abilities and the importance of its conservation.BodyOne of the most fascinating characteristics of the African Grey Parrot is its exceptional ability to mimic human speech. This species possesses a highly developed syrinx, which allows it to produce a wide range of sounds, including complex vocalizations such as whistling and\n Rewrite the last response with a slightly different perspective continue"
//   },
//   {
//       "role": "assistant",
//       "content": "speaking. African Grey Parrots have been known to learn hundreds of words and phrases, and they are capable of using them in context to express their desires or feelings. Moreover, they can imitate different accents, intonations, and even the voices of other animals.\n\nThe exceptional speech abilities of African Grey Parrots make them highly popular pets worldwide"
//   }
// ]

// //   const concatenatedString = messages.reduce((accumulator, current) => {
// //     if (current.role === "user" || current.role === "assistant") {
// //       return accumulator + current.content + "\n";
// //     } else {
// //       return accumulator;
// //     }
// //   }, "");
  
// //   // Function to get the last 1000 words
// //   function getLast1000Words(str) {
// //     if (str.length <= 1000) {
// //       return str;
// //     } else {
// //       let words = str.split(" ");
// //       let startIndex = Math.max(words.length - 1000, 0);
// //       let last1000Words = words.slice(startIndex).join(" ");
// //       return last1000Words;
// //     }
// //   }
  
// //   // Remove newline characters and get the last 1000 words
// //   let removeNewlines = concatenatedString.replace(/\n/g, '');
// //   let last1000Words = getLast1000Words(removeNewlines);
  
// //   // Switch statement with multiple cases
// //   let myCase = "case3";
// //   switch (myCase) {
// //     case "case1":
// //       // Do something
// //       break;
// //     case "case2":
// //       // Do something else
// //       break;
// //     case "case3":
// //       // Concatenate "continue" to the end of the last 1000 words
// //       last1000Words += " continue";
// //       break;
// //     default:
// //       // Do something if none of the cases match
// //   }
  
  
// //   let essay = "Elon continue continue continue continue continue Musk Write an essay on Elon Musk and his key achievements. Specifically, his impact on the tech industry and his vision for the future of space exploration. Use a formal academic writing style.Elon Musk is a technology entrepreneur and visionary who has made significant contributions to the tech industry. He is the founder, CEO, and lead designer of SpaceX, co-founder and CEO of Tesla Inc., co-founder of Neuralink Corporation, and co-founder of The Boring Company. Through these companies, he has revolutionized several industries such as space exploration, electric cars manufacturing, tunneling technology development among others.One major key achievement by Elon Musk was founding SpaceX in 2002 with an aim to reduce space transportation costs while colonizing Mars. Under his leadership and vision for reusable rockets, SpaceX became the first privately funded company to send a spacecraft (Dragon) to the International Space Station (ISS). This historic achievement paved way for further developments including manned continue"
 

// //   const lastIndex = essay.lastIndexOf("continue");
// // if (lastIndex !== -1) {
// //   essay = essay.substring(0, lastIndex) + "\n Rewrite the last response with a slightly different perspective" + essay.substring(lastIndex + "continue".length);
// // }
  
// // // console.log(essay);
// // //   console.log('User text:', userText);
// // //   console.log('Assistant text:', assistantText);
// // // console.log(newMessage);

// // const messages = [
// //   {
// //       "role": "system",
// //       "content": "You are a contemplative thesis writer."
// //   },
// //   {
// //       "role": "user",
// //       "content": "African Grey Parrot Write an essay on the African Grey Parrot and its unique characteristics. Specifically, its remarkable ability to mimic human speech and the importance of its conservation. Use a formal academic writing style.IntroductionThe African Grey Parrot, known scientifically as Psittacus erithacus, is a medium-sized parrot that is native to the rainforests of West and Central Africa. This species is distinguished by its exceptional ability to mimic human speech fluently and accurately. In this essay, we will explore the various unique characteristics of the African Grey continueParrot, focusing particularly on its speech abilities and the importance of its conservation.BodyOne of the most fascinating characteristics of the African Grey Parrot is its exceptional ability to mimic human speech. This species possesses a highly developed syrinx, which allows it to produce a wide range of sounds, including complex vocalizations such as whistling and\n continue"
// //   },
// //   {
// //       "role": "assistant",
// //       "content": "speaking. African Grey Parrots have been known to learn hundreds of words and phrases, and they are capable of using them in context to express their desires or feelings. Moreover, they can imitate different accents, intonations, and even the voices of other animals.\n\nThe exceptional speech abilities of African Grey Parrots make them highly popular pets worldwide"
// //   }
// // ]

// const concatenatedString = messages.reduce((accumulator, current) => {
//   if (current.role === "user") {
//     let content = current.content;
    
//     // Remove the last occurrence of the word "continue"
//     content = content.replace(/continue\s*$/, "");

//     // Remove the additional string "Rewrite the last response with a slightly different perspective" if it exists at the end of the content
//     content = content.replace(/Rewrite the last response with a slightly different perspective\s*$/, "");

//     return accumulator + content + "\n";
//   } else if (current.role === "assistant") {
//     return accumulator + current.content + "\n";
//   } else {
//     return accumulator;
//   }
// }, "");

// console.log(concatenatedString);