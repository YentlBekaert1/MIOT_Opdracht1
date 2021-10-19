import AbstractView from "./abstractView";

export default class extends AbstractView {
      constructor(params) {
          super(params);
          this.setTitle("Performances");
      }
  
      async getHtml() {
        let performances_div = document.createElement('div');
        performances_div.id = "performances";
        let title = document.createElement('h1');
        title.innerText = "Performances page"
        performances_div.appendChild(title);
        return performances_div;
      }
  }