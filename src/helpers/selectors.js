export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const match = function (appointments, ids) {
    let matchedAppts = ids.map((id) => appointments[id]);
    return matchedAppts;
  };

  let newArray = [];
  //console.log("this is day", day)

  state.days.map((dayObj) => {
    console.log("dayObj", dayObj);
    if (day === dayObj.name) {
      dayObj.appointments.map((appointmentNum) => {
        newArray.push(appointmentNum);
      });
    }
  });

  console.log("newArray", newArray);

  return match(state.appointments, newArray);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewInfo = state.interviewers[interview.interviewer];
  const interviewObj = {
    student: interview.student,
    interviewer: interviewInfo,
  };
  return interviewObj;
}

export function getInterviewersForDay (state, day) {
  const matchInterviewer = function (appointments, ids) {
    let matchedAppts = ids.map((id) => appointments[id]);
    return matchedAppts;
  };

  let interviewersArray = [];

  state.days.map((dayObj) => {
    console.log("dayObj", dayObj);
    if (day === dayObj.name) {
      dayObj.interviewers.forEach((interviewersID) => 
        interviewersArray.push(interviewersID) 
      );
    }
    return interviewersArray; 
  });
  return matchInterviewer(state.appointments, interviewersArray);
    }
