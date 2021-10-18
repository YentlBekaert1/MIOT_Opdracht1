import path from 'path'
import express from 'express'
import webPush from 'web-push'

let subscriptions = [];
let timeLeft = 15;
let timer;

const activityRoutes = require('../api/routes/activities');

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html');
            
app.use(express.static(DIST_DIR))
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/get", (req, res) => {
    res.json("test");
})
app.get("/calendar", (req, res) => {
    res.sendFile(HTML_FILE);
})
app.get("/foodcorner", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/weather", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.get("/performances", (req, res) => {
    res.sendFile(HTML_FILE)
})
app.use('/activities', activityRoutes);
app.use(express.json);
const vapidKeys = {
    publicKey:
  'BCi3AfGJVfxoDOB3JGMbvyAzOBJ8KiqRrUn6OhYaWsfUrwOq6h9hI1x464AQaVyaNFhAGNi0thYCtSxRmy0P8SI',
    privateKey: 'tjl2sNdpoiLYqUhR_TjSSZNq1U2fcBNw2LT76C_nCOM'
  };
  
  webPush.setVapidDetails(
    'mailto:dennissheppard+pwa@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  function sendNotification(subscription) {
    timer = null;
    const notificationText = 'Peggy wants a pretzel! You have ' + timeLeft + ' seconds to feed her!';
    webPush.sendNotification(subscription, notificationText).then(function() {
      console.log('Notification sent');
    }).catch(function(error) {
      console.log('Error sending Notification' + error);
      subscriptions.splice(subscriptions.indexOf(endpoint), 1);
    });
  }

  app.post('/register', (req, res) => {
    if (!req.body || !req.body.endpoint) {
      // Invalid subscription.
      res.status(400);
      res.send('Invalid subscription');
      return false;
    }
  
    console.log('Subscription registered ' + req.body.endpoint);
    const found = subscriptions.some((sub) => {
      return sub.endpoint === req.body.endpoint;
    });
    if (!found) {
      subscriptions.push(req.body);
    }
  
    res.sendStatus(200);
  });

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})




