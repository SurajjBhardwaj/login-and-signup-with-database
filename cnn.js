const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const app = express();

// Replace <db_url> and <db_name> with the actual URL and name of your database
const url = '<db_url>';
const dbName = '<db_name>';

// Use the MongoClient to connect to the database
MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
  if (error) throw error;

  console.log('Connected to the database');

  // Get a reference to the users collection
  const usersCollection = client.db(dbName).collection('users');

  // Set up the registration route
  app.post('/register', (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) throw error;

      // Insert the new user into the users collection
      usersCollection.insertOne({ username, password: hashedPassword }, (error, result) => {
        if (error) throw error;

        console.log('Registered new user');
        res.send('Successfully registered');
      });
    });
  });

  // Set up the sign-in route
  app.post('/signin', (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Find the user with the matching username
    usersCollection.findOne({ username }, (error, user) => {
      if (error) throw error;

      // If the user doesn't exist, send an error message
      if (!user) {
        res.status(401).send('Invalid username or password');
        return;
      }

      // Compare the hashed password in the database to the provided password
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) throw error;

        // If the passwords match, send a success message
        if (result) {
          res.send('Successfully signed in');
        }
        // If the passwords don't match, send an error message
        else {
          res.status(401).send('Invalid username or password');
        }
      });
    });
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
