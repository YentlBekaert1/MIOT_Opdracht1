import AbstractView from "./abstractView";

export default class extends AbstractView {
      constructor(params) {
          super(params);
          this.setTitle("Weather");
      }
  
      async getHtml() {
        let weather_div = document.createElement('div');
        weather_div.id = "weather";
        let title = document.createElement('h1');
        title.innerText = "Weather page"
        weather_div.appendChild(title);
        return weather_div;
      }
  }