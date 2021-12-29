import React, { useState, useEffect } from "react";

import "./Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import axios from "axios";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
const {state, setDay, bookInterview, cancelInterview} = useApplicationData()

  const appointmentObject = getAppointmentsForDay(state, state.day);
  console.log("what apppointment object", appointmentObject)
  const interviewerObject = getInterviewersForDay(state, state.day);
  console.log("what is interview Object", interviewerObject)
  const appointment = appointmentObject.map((appointmentObject) => {
    const interview = getInterview(state, appointmentObject.interview);
    return (
      <Appointment
        {...appointmentObject}
        key={appointmentObject.id}
        time={appointmentObject.time}
        interview={interview}
        interviewers={interviewerObject}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
            day={state.day}
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
        <Appointment
          key="last"
          time="5pm"
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </section>
    </main>
  );
}
