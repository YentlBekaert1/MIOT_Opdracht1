import './styles/main.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation';
import _ from 'lodash';
import Showdashboard from './dashboard';

async function reAuthorize() {
  try {
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

function reAuthorize(){
  const auth_link = "https://www.strava.com/oauth/token"
  fetch(auth_link,{
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
  })
  .then(res => res.json())
  .then(function(data){ 
      console.log(data)
      return data.access_token;
  })
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

const dashboard_button = document.getElementById("dashboard_tab");
const calendar_button = document.getElementById("kalender_tab");
const foodcorner_button = document.getElementById("food_corner_tab");
const weather_button = document.getElementById("weather_tab");
const performances_button = document.getElementById("performances_tab");
const mainpanelappcontent = document.getElementById("mainpanelappcontent");

mainpanelappcontent.innerHTML = Showdashboard();

var active_tab = dashboard_button;
var last_active_tab = dashboard_button;
dashboard_button.classList.toggle('active');


dashboard_button.addEventListener('click', () => {
  active_tab = dashboard_button;
  set_tab_active(active_tab);
  mainpanelappcontent.innerHTML = Showdashboard();
  
  var token = reAuthorize();
  console.log(token);
 
})
calendar_button.addEventListener('click', () => {
  active_tab = calendar_button;
  set_tab_active(active_tab);
})
foodcorner_button.addEventListener('click', () => {
  active_tab = foodcorner_button;
  set_tab_active(active_tab);
})
weather_button.addEventListener('click', () => {
  active_tab = weather_button;
  set_tab_active(active_tab);
})
performances_button.addEventListener('click', () => {
  active_tab = performances_button;
  set_tab_active(active_tab);
})

function set_tab_active(tab){
  tab.classList.toggle('active');
  last_active_tab.classList.toggle('active');
  last_active_tab = tab;
}



function component() {
    const element = document.createElement('div');

     // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
}
  
  document.getElementById("mainpanelappcontent").appendChild(component());