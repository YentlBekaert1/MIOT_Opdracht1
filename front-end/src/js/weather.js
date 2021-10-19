
export default function Showweather() {

        let weather_div = document.createElement('div');
        weather_div.id = "weather";
        let title = document.createElement('h1');
        title.innerText = "Weather page"
        weather_div.appendChild(title);

        let mainpannelappcontent = document.createElement('div');
          mainpannelappcontent.id = "mainpanelappcontent";
          mainpannelappcontent.appendChild(weather_div);
        return mainpannelappcontent;      
  }