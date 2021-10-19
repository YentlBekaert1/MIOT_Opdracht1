import '../../util'
import {subscription_test} from '../../index'
export default async function send_notification(element){
   
       // const pushBtn  = element.querySelector("#notification_button");
        
        
        function sendMessage(sub, title, message, delay) {
            const data = {
                subscription: sub,
                payload: JSON.stringify({
                    title: title,
                    message: message
                })
            }
        
            if (delay) {
                data.delay = delay;
            }
        
            return fetch('./api/notify', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        
        function getPushSubscription() {
            return navigator.serviceWorker.ready
                .then(function(registration) {
                    return registration.pushManager.getSubscription();
                });
        }
        
        function unsubscribePush() {
            return getPushSubscription().then(function(subscription) {
                return subscription.unsubscribe().then(function() {
                    deleteSubscription(subscription);
                });
            });
        }
    
        if ((navigator.serviceWorker && 'PushManager' in window)) {
            element.addEventListener('click', function(event) {
                event.preventDefault();
                    sendMessage(sub, 'Interested in how to do this?','Click on this notification to get back to the tutorial to learn how to do this!', 5000);
            });
    }
}