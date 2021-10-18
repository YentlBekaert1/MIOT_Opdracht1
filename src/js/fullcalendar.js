import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  return [year, month, day].join('-');
}

export default async function makeCalendar(calendarEl){
    var calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: formatDate().toString(),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2021-10-01',
        },
        {
          title: 'Long Event',
          start: '2021-10-01',
          end: '2021-10-10'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-10-05T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-10-05T16:00:00'
        },
        {
          title: 'Conference',
          start: '2021-10-11',
          end: '2021-10-13'
        },
        {
          title: 'Meeting',
          start: '2021-10-12T10:30:00',
          end: '2021-10-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2021-10-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2021-10-12T14:30:00'
        },
        {
          title: 'Birthday Party',
          start: '2021-10-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: '/activities',
          start: '2021-10-28'
        }
      ]
    });
  
   calendar.render();
}