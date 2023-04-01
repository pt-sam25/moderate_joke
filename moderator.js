
//Moderate Jokes Microservice:
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

mongoose.connect('mongodb://localhost/jokes', { useNewUrlParser: true });

const jokeSchema = new mongoose.Schema({
  joke: String,
  type: String,
  submittedBy: String
});

const Joke = mongoose.model('Joke', jokeSchema);

app.get('/jokes', (req, res) => {
  Joke.find({}, (error, jokes) => {
    if (error) throw error;
    res.send(jokes);
  });
});

app.delete('/jokes/:id', (req, res) => {
  const id = req.params.id;
  Joke.findByIdAndDelete(id, (error) => {
    if (error) throw error;
    res.sendStatus(204);
  });
});

app.listen(port, () => {
  console.log(`Moderate Jokes microservice listening at http://localhost:${port}`);
});
