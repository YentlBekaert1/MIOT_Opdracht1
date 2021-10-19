import './js/navigation';
import './css/style.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../src/img/logo.png';

'use strict';

window.addEventListener('DOMContentLoaded', (event) => {


    var test = document.getElementById("logo")
    const myLogo = new Image();
    myLogo.src = logo;
    test.appendChild(myLogo);


    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');
      navigator.serviceWorker.register('sw.js')
      fetch('https://apimytrainingsdata.azurewebsites.net/push/key')
      .then(function(res) {
          res.json().then(function(data) {
              registerPush(data.key);
          });
      });
    } else {
      console.warn('Push messaging is not supported');
    }

    function registerPush(appPubkey) {
      navigator.serviceWorker.ready.then(
          function(registration) {
          return registration.pushManager.getSubscription()
              .then(function(subscription) {
                 let isSubscribed = !(subscription === null);
                  if (isSubscribed) {
                    console.log("user is subscirbed");
                    return subscription;
                  }
                  else{
                        console.log("user is NOT subscirbed");
                        return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(appPubkey)
                    });
                    }
              }) 
              .then(function(subscription) {
                  return fetch('https://apimytrainingsdata.azurewebsites.net/push/subscribe', {
                      method: 'post',
                      headers: { 'Content-type': 'application/json' },
                      body: JSON.stringify({ subscription: subscription })
                  });
              });
      });
    }
  
  function urlBase64ToUint8Array(base64String) {
      var padding = '='.repeat((4 - base64String.length % 4) % 4);
      var base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');
  
      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);
  
      for (var i = 0; i < rawData.length; ++i)  {
          outputArray[i] = rawData.charCodeAt(i);
      }
  
      return outputArray;
  }
    
});