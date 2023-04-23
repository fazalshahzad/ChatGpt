const Package = require('../package.json');
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb+srv://youMakr:youMakr@youmakr.wjwmkyi.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`\nMogoDb Connected Successfuly at MongoAtlas with Database Name ChatLayout\n`);
    console.log("Your App Has the Following Dependicies\n");
    for (const dependency in Package.dependencies) {
      console.log(dependency);
    }
  } catch (error) {
    console.log('Error: Not Connected to the MongoDb' + error);
  }
})();