import React from "react";

import "./Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const appointmentObject = getAppointmentsForDay(state, state.day);
  const interviewerObject = getInterviewersForDay(state, state.day);
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
