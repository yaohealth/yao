import Vue from 'vue'

export const state = () => {
  return {
    doctors: []
  }
}

export const mutations = {
  SET_DOCTORS: function (state, doctors) {
    state.doctors = doctors
  },
  ADD_INITIAL_DATES: function (state, payload) {
    const doc = state.doctors.find(doctor => doctor.iddoctorprofile === payload.id)
    if (doc && doc.appointmentTypes) {
      doc.appointmentTypes.map(type => {
        if(type.name === payload.appointmentType.name) {
          Vue.set(type, 'availableDates', payload.dates)
        }
      })
    }
  },
  ADD_DATES: function (state, payload) {
    const doc = state.doctors.find(doctor => doctor.iddoctorprofile === payload.id)
    if (doc && doc.appointmentTypes) {
      for (const type of doc.appointmentTypes) {
        type.availableDates.push({date: payload.date})
      }
    }
  },
  ADD_FORMATED_DATES: function (state, payload) {
    const doc = state.doctors.find(doctor => doctor.iddoctorprofile === payload.id)
    if (doc && doc.appointmentTypes) {
      doc.appointmentTypes.forEach( appointmentType => {
        if(appointmentType.id === payload.type.id) {
          appointmentType.availableDates.forEach(date => {
            if(payload.times){
              const matchedDate = payload.times.find(dayArray => {
                if (dayArray.length > 0){
                  return this.$dayjs(dayArray[0].time, {locale: 'de'}).format('YYYY-MM-DD') === date.date
                }
              })
              if(matchedDate){
                const fullDate = this.$dayjs(matchedDate[0].time, {locale: 'de'})
                Vue.set(date, 'formatedDates', {
                  date: fullDate.format('DD'),
                  weekday: fullDate.format('dd'),
                  month: fullDate.format('MMMM'),
                  year: fullDate.year(),
                  times: matchedDate.map(time => {
                    return this.$dayjs(time.time, {locale: 'de'}).format('HH:mm')
                  })
                })
              }
            }
          })
        }
      })
    }
  },
  ADD_APPOINTMENTTYPES: function (state, payload) {
    const doc = state.doctors.find(doctor => doctor.iddoctorprofile === payload.id)
    if (doc) {
      Vue.set(doc, 'appointmentTypes', payload.appointmentTypes)
    }
  }
}

export const getters = {
  getAllDoctors: state => state.allDoctors,
  getSpecificDoctor: (state) =>  (index) => {
    return state.doctors.find(doctor => doctor.iddoctorprofile === index)
  }
}