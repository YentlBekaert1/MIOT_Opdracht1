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
    router().then(value =>{
    if(window.location.href.indexOf('calendar')>0){
       // console.log('calendar');
        //console.log(document.getElementById('calendar'));
        var calendarEl = document.getElementById('calendar');
        makeCalendar(calendarEl);
    }});
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

    document.querySelector("#mainpanelappcontent").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

window.addEventListener('DOMContentLoaded', (event) => {
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
        //mainpanelapp.classList.toggle('open');
    });
    
/*
    let dashboard_button = document.getElementById("dashboard_tab");
    let calendar_button = document.getElementById("kalender_tab");
    let foodcorner_button = document.getElementById("food_corner_tab");
    let weather_button = document.getElementById("weather_tab");
    let performances_button = document.getElementById("performances_tab");

    let mainpanelappcontent = document.getElementById("mainpanelappcontent");
    mainpanelappcontent.replaceWith(Showdashboard());
    mainpanelappcontent.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    active_tab = dashboard_button;
    last_active_tab = dashboard_button;
    dashboard_button.classList.toggle('active');
    
    
    dashboard_button.addEventListener('click', () => {
        active_tab = dashboard_button;
        sidebar.classList.toggle('open');
        set_tab_active(active_tab);
        const mainpanelappcontent = document.getElementById("mainpanelappcontent");
        mainpanelappcontent.replaceWith(Showdashboard());
    })
    calendar_button.addEventListener('click', () => {
        active_tab = calendar_button;
        sidebar.classList.toggle('open');
        set_tab_active(active_tab);
        const mainpanelappcontent = document.getElementById("mainpanelappcontent");
        mainpanelappcontent.replaceWith(Showcalendar());
    })
    foodcorner_button.addEventListener('click', () => {
        active_tab = foodcorner_button;
        sidebar.classList.toggle('open');
        set_tab_active(active_tab);
        const mainpanelappcontent = document.getElementById("mainpanelappcontent");
        mainpanelappcontent.replaceWith(Showfoodcorner());
    })
    weather_button.addEventListener('click', () => {
        active_tab = weather_button;
        sidebar.classList.toggle('open');
        set_tab_active(active_tab);
        const mainpanelappcontent = document.getElementById("mainpanelappcontent");
        mainpanelappcontent.replaceWith(Showweather());
    })
    performances_button.addEventListener('click', () => {
        active_tab = performances_button;
        sidebar.classList.toggle('open');
        set_tab_active(active_tab);
        const mainpanelappcontent = document.getElementById("mainpanelappcontent");
        mainpanelappcontent.replaceWith(Showperformances());
    })
    
    function set_tab_active(tab){
        tab.classList.toggle('active');
        last_active_tab.classList.toggle('active');
        last_active_tab = tab;
    }
*/

}); 