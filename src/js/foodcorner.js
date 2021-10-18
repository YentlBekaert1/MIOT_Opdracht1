import AbstractView from "./abstractView";

export default class extends AbstractView {
      constructor(params) {
          super(params);
          this.setTitle("Foodcorner");
      }
  
      async getHtml() {
        let foodcorner_div = document.createElement('div');
        foodcorner_div.id = "foodcorner";
        let title = document.createElement('h1');
        title.innerText = "Foodcorner page"
        foodcorner_div.appendChild(title);
        return foodcorner_div;
      }
  }