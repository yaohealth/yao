export const state = () => {
  return {
    doctors: []
  }
}

export const mutations = {
  SET_DOCTORS: (state, doctors) => {
    state.doctors = doctors
  },
  ADD_DATES: (state, payload) => {
    for (const doctor of state.doctors) {
      if (doctor.iddoctorprofile === payload.id) {
        doctor.availableDates = payload.dates
      }
    }
  },
  ADD_APPOINTMENTTYPES: (state, payload) => {
    for (const doctor of state.doctors) {
      if (doctor.iddoctorprofile === payload.id) {
        doctor.appointmentTypes = payload.appointmentTypes
      }
    }
  }
}

export const getters = {
  getAllDoctors: state => state.allDoctors,
  getSpecificDoctor: (state) =>  (index) => {
    return state.doctors.find(doctor => doctor.iddoctorprofile === index)
  }
}