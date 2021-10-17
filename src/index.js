import './js/navigation';
import './css/style.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../src/img/logo.png';

'use strict';

window.addEventListener('DOMContentLoaded', (event) => {

  // Needed for Hot Module Replacement
  if(typeof(module.hot) !== 'undefined') {
      module.hot.accept() // eslint-disable-line no-undef  
    }

  if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
          console.log('SW registered: ', registration);
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
      });
    }

    var test = document.getElementById("logo")
    const myLogo = new Image();
    myLogo.src = logo;
    test.appendChild(myLogo);

    const applicationServerPublicKey = 'BGqgdQ3a3B98uvXiUcAm8w1DpPTkhLbYPDwUY6JTtEMMoeKR0eNXE_5wXdaCFKw3thk3RP66vszhh464kWczzEY';

    let isSubscribed = true;
    let swRegistration = null;

    function urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    function subscribeUser() {
      const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(subscription) {
        console.log(subscription);
        isSubscribed = true;
      })
      .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
      });
    }

    function initializeUI() {
      // Set the initial subscription value
      swRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        isSubscribed = !(subscription === null);

        console.log(subscription);

        if (isSubscribed) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
      });

      subscribeUser();
    }

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
      .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        initializeUI();
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
    } else {
      console.warn('Push messaging is not supported');
    }
});