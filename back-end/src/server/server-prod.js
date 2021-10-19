import express from 'express'
import { pushWeb , vkey}  from './configured-web-push';
import { subsription } from '../db/db';
import cors from 'cors'

const activityRoutes = require('../api/routes/activities');
const app = express(),
            DIST_DIR = __dirname;

app.disable('x-powered-by');
            
app.use(express.static(DIST_DIR));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/push/key', async function(req, res) {
  if (vkey !== '') {
      res.send({
          key: vkey
      });
  } else {
      res.status(500).send({
          key: 'VAPID KEYS ARE NOT SET'
      });
  }
});

app.post('/push/subscribe', async function(req, res) {
  try {
      const sub = req.body.subscription;

      // Find if user is already subscribed searching by `endpoint`
      const exists = await subsription.findOne({ endpoint: sub.endpoint });

      if (exists) {
          res.status(400).send('Subscription already exists');

          return;
      }
      
      await (new subsription(sub)).save();

      res.status(200).send('Success');
  } catch (e) {
      res.status(500).send(e.message);
  }
});

app.post('/push/unsubscribe', async function(req, res) {
  try {
      const sub = req.body.subscription;

      await subsription.remove({endpoint: sub.endpoint});
      console.log('Deleted: ' + sub.endpoint);

      res.status(200).send('Success');
  } catch (e) {
      res.status(500).send(e.message);
  }
});

app.post('/push/notify', async function(req, res) {
  const data = req.body;

  const sendNotification = async function() {
      try {
          await pushWeb.sendNotification(data.subscription, data.payload, { contentEncoding: 'aes128gcm' })
              .then(function (response) {
                  console.log('Response: ' + JSON.stringify(response, null, 4));
                  res.status(201).send(response);
              })
              .catch(function (e) {
                  console.log('Error: ' + JSON.stringify(e, null, 4));
                  res.status(201).send(e);
              });
      } catch (e) {
          res.status(500).send(e.message);
      }
  };

  if (data.delay) {
      setTimeout(sendNotification, data.delay);
  } else {
      sendNotification();
  }
});

app.post('/push/notify-demo', async function(req, res) {
  try {
      const ObjectId = require('mongoose').Types.ObjectId;
      const sub = await subsription.findOne({ _id: new ObjectId("616e91ac9693ad205b466de5") });
      await pushWeb.sendNotification(sub, JSON.stringify({title: 'Annoyed yet?', message: 'Hello there!'}), { contentEncoding: 'aes128gcm' })
          .then(function (response) {
              console.log('Response: ' + JSON.stringify(response, null, 4));
              res.status(201).send(response);
          })
          .catch(function (e) {
              console.log('Error: ' + JSON.stringify(e, null, 4));
              res.status(201).send(e);
          });
  } catch (e) {
      res.status(500)
          .send(e.message);
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})




