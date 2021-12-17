
import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import axios from "axios"; 

import {getAppointmentsForDay} from "helpers/selectors";

import { getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });
 

  const setDay = day => setState({ ...state, day });
  

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const appointment = dailyAppointments.map(appt =>{
    const interview = getInterview(state, appt.interview)
    return (
      <Appointment 
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
      /> 
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            value={state.days}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
