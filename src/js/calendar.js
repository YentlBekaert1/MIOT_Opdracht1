
import AbstractView from "./abstractView";

export default class extends AbstractView {
      constructor(params) {
          super(params);
          this.setTitle("Calendar");
      }
  
      async getHtml() {
          let calendar_div = document.createElement('div');
          calendar_div.id = "calendar";

          return calendar_div;
           
      }
}