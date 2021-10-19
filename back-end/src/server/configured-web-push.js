
import webPush from 'web-push';

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BGAQXJhUhnN82amHyv0Q3JjGGQfsghtqS3bShmHtG3me2MtGTdQUjTIk3HFDpoG33tLaemXxy6jV9d_1lpXGWwE';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '2gQ9fKp1dR3wN1ILUOntY4NilojRch10VAEXiVdlTRk';

if (vapidPublicKey === '' || vapidPrivateKey === '') {
    console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
      "environment variables. You can use the following ones:");
    console.log(webPush.generateVAPIDKeys());
} else {
    webPush.setVapidDetails(
        'mailto:email@outlook.com',
        vapidPublicKey,
        vapidPrivateKey
    );
}

export var pushWeb = webPush, vkey = vapidPublicKey;

