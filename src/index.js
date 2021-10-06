import './styles/main.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation';
import _ from 'lodash';


async function reAuthorize() {
  try {
      const auth_link = "https://www.strava.com/oauth/token";
      let res = await fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
  
        },
  
        body: JSON.stringify({
  
            client_id: '33929',
            client_secret: '0c46ee1b55778e235eef2ad1dcdb0610ce311c3a',
            refresh_token: 'f59266e61a4d9e07dcef9434a03068e53d099086',
            grant_type: 'refresh_token'
        })
    });
    return await res.json();
  } catch (error) {
      console.log(error);
  }
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}



function component() {
    const element = document.createElement('div');

     // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
}
  
  document.getElementById("mainpanelappcontent").appendChild(component());