import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar as BigCalendar, momentLocalizer, Event } from "react-big-calendar";
import 'moment/locale/es';
import { randomString } from "../util/random";
import api from "../Servicios/Peticion";
import { useSelector } from "react-redux";

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })

const Calendar = (props) => {
    const token = useSelector(state => state.token);
    const [events, setEvents] = useState(props.events);
    console.log(events);
    const removeEvent = (event) => {
        setEvents(events.filter((e) => e.id != event.id));
    };

    const addEvent = ({ start, end }) => {
        const duration = moment.duration(moment(end).diff(start));
        const minutes = duration.asMinutes();
        if(minutes > 30) {
            api('POST', '/tutor/times/new', { date: start, minutes }, { 'access-token': token })
                .then((res) => {
                    if(res.status == 'success') {
                        setEvents(events.concat({
                            id: randomString(),
                            title: 'Disponible',
                            start,
                            end
                        }));
                    }
                    else {
                        alert(res.error);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        else {
            alert('Sólo puedes agendar desde una hora en adelante!');
        }
    };

    return (
        <BigCalendar
        localizer={momentLocalizer(moment)}
        events={events}
        defaultDate={new Date()}
        defaultView={'week'}
        views={['day', 'week', 'month']}
        culture={'es'}
        components={{
            timeSlotWrapper: ColoredDateCellWrapper,
        }}
        selectable
        onDoubleClickEvent={removeEvent}
        onSelectSlot={addEvent}
        messages={{
            next: "sig",
            previous: "ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día"
          }}
        />
    );
};

export default Calendar;
