
import React, { useState, useEffect } from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import axios from "axios"; 

import {getAppointmentsForDay} from "helpers/selectors";

import { getInterview } from "helpers/selectors";

import { getInterviewersForDay } from "helpers/selectors";

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
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
  }, [])

  function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(` /api/appointments/${id}`, {interview : interview}).then(res => {
      setState({
        ...state,
        appointments
      })
      return res;
    }).catch(err => console.log("error", err))
  }

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null 
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
 return axios.delete(` /api/appointments/${id}`).then((res) => {
   setState({
     ...state, 
     appointments
   })
   return res;
 })
}
  
  const appointmentObject = getAppointmentsForDay(state, state.day)
  const interviewerObject = getInterviewersForDay(state, state.day)

  const appointment = appointmentObject.map((appointmentObject)  => {
    const interview = getInterview(state, appointmentObject.interview)
    return (
      <Appointment  
      {...appointmentObject}
      key={appointmentObject.id}
      id={appointmentObject.id}
      time={appointmentObject.time}
      interview={interview}
      interviewers={interviewerObject}
      bookInterview={bookInterview}
      cancelInterview= {cancelInterview}
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
