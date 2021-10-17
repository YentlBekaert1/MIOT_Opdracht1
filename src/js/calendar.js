
import AbstractView from "./abstractView";

export default class extends AbstractView {
      constructor(params) {
          super(params);
          this.setTitle("Calendar");
      }
  
      async getHtml() {
          return `
            
              <h1>Calendar</h1>
              <p>
                  Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
              </p>
              <div id="calendar"></div>
          `;
           
      }
  }
