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
    })
}); 
