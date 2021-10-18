import Showdashboard from './dashboard';
import Showcalendar from './calendar';
import Showfoodcorner from './foodcorner';
import Showweather from './weather';
import Showperformances from './performances';
import makeCalendar from './fullcalendar';

'use strict';

var active_tab;
var last_active_tab;

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Showdashboard },
        { path: "/calendar", view: Showcalendar },
        { path: "/foodcorner", view: Showfoodcorner },
        { path: "/weather", view: Showweather },
        { path: "/performances", view: Showperformances },
        //{ path: "/posts/:id", view: PostView },
       // { path: "/settings", view: Settings }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    const lastchild = document.querySelector("#mainpanelappcontent > div");

    view.getHtml().then(
        value => {
            lastchild.parentNode.replaceChild(value,lastchild);
            return value;
        } 
    ).then( 
        value => {
            if(value.id == "calendar"){
                makeCalendar(value)
            }
        }
    )
};

window.addEventListener("popstate", router());

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("dom loaded")
    document.getElementById('user_options').style.height = "0px";
    document.getElementById('user_button').onclick = function(){
        if(document.getElementById('user_options').style.height == "0px"){
            document.getElementById('user_options').style.display = "block";
           
            document.getElementById('user_options').style.overflow = "hidden";
            var pos = 0;
            var id = setInterval(frame, 6);
            function frame() {
                if (pos == 190) {
                clearInterval(id);
                } else {
                pos = pos + 5; 
                document.getElementById('user_options').style.height = (pos + "px").toString();
                }
            }
        }else{
            var pos = 160;
            var id = setInterval(frame, 10);
            function frame() {
                if (pos == 0) {
                clearInterval(id);
                } else {
                pos = pos - 5; 
                document.getElementById('user_options').style.height = (pos + "px").toString();
                }
            }
            
        }
    }
    let hamburgerBtn = document.getElementById('hamburger_button');
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
}); 