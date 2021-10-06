import Showdashboard from './dashboard';

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
    const hamburgerBtn = document.getElementById('hamburger_button');
    hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    //mainpanelapp.classList.toggle('open');
    });

    const dashboard_button = document.getElementById("dashboard_tab");
    const calendar_button = document.getElementById("kalender_tab");
    const foodcorner_button = document.getElementById("food_corner_tab");
    const weather_button = document.getElementById("weather_tab");
    const performances_button = document.getElementById("performances_tab");
    const mainpanelappcontent = document.getElementById("mainpanelappcontent");

    mainpanelappcontent.parentNode.replaceChild(Showdashboard(), mainpanelappcontent);

    var active_tab = dashboard_button;
    var last_active_tab = dashboard_button;
    dashboard_button.classList.toggle('active');


    dashboard_button.addEventListener('click', () => {
    active_tab = dashboard_button;
    sidebar.classList.toggle('open');
    set_tab_active(active_tab);
    mainpanelappcontent.parentNode.replaceChild(Showdashboard(), mainpanelappcontent);
    })
    calendar_button.addEventListener('click', () => {
    active_tab = calendar_button;
    sidebar.classList.toggle('open');
    set_tab_active(active_tab);
    })
    foodcorner_button.addEventListener('click', () => {
    active_tab = foodcorner_button;
    sidebar.classList.toggle('open');
    set_tab_active(active_tab);
    })
    weather_button.addEventListener('click', () => {
    active_tab = weather_button;
    sidebar.classList.toggle('open');
    set_tab_active(active_tab);
    })
    performances_button.addEventListener('click', () => {
    active_tab = performances_button;
    sidebar.classList.toggle('open');
    set_tab_active(active_tab);
    })

    function set_tab_active(tab){
    tab.classList.toggle('active');
    last_active_tab.classList.toggle('active');
    last_active_tab = tab;
    }
}); 
