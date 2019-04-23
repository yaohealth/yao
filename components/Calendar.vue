<template>
  <v-container v-if="formatedDates.length > 0" fluid grid-list-md align-content-space-between>
    <v-layout class="header">
      <v-flex class="prev"><v-btn flat :disabled="!!pageOne()" @click="prevDates">prev</v-btn></v-flex>
      <v-flex class="month">{{formatedDates[0].month}}</v-flex>
      <v-flex class="next"><v-btn flat @click="nextDates">next</v-btn></v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-data-iterator
            :items="formatedDates"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            hide-actions
    >
      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg3>
          <v-list dense>
            <div class="dateContainer">
              <div class="date">{{ props.item.date }}.</div>
              <div class="weekday">{{ props.item.weekday }}</div>
            </div>
            <v-list-tile class="timecontainer" v-for="time in props.item.times" :key="props.item.date + time">
              <v-list-tile-content class="timecontainer"><v-btn class="timebtn" flat @click="openBookingDialog(`${props.item.date} ${props.item.month} ${props.item.year} ${time}`)">{{time}}</v-btn></v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </template>
    </v-data-iterator>
    <BookingForm  v-model="showBooking" :selectedDate="selectedDate" :appointmentTypes="doctor.appointmentTypes" ></BookingForm>
  </v-container>
  <h1 class="loading" v-else>Calendar is loading.....</h1>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BookingForm from '@/components/BookingForm'
  export default {
    watch: {
      doctor: {
        handler(newValue, oldValue){
          this.setFormatedTimes()
        }
      }
    },
    props: ['doctor'],
    components: {
      BookingForm
    },
    data() {
      return {
        pagination: {
          rowsPerPage: 5
        },
        items: this.dates,
        showBooking: false,
        selectedDate: '',
        formatedDates: []
      }
    },
    methods: {
      // inital getDates is in doc -> saves it in vuex
      // move allDates to calendar ( more actually have a function to call to get dates to add to the exisiting)
      // or then these are not set
      // when rest of the month is loaded count how many dates are available
      // when available - display <= 5 --> load next month + available times  --> save in vuex



      // calendar next method takes next (rowPerPage) dates and displays them
      // check available - display <= 5 --> load next month
      // when in future display prev btn

      ...mapGetters({
        getSpecificDoctor: 'localStorage/getSpecificDoctor'
      }),
      openBookingDialog(date) {
        this.selectedDate = date
        this.showBooking = true
      },
      async getTimes () {
        const dateRequests =[]
        for(const date of this.doctor.allDates) {
          dateRequests.push(this.$axios.$get(`${process.env.ACUITYPROXY}/api/availability/times?appointmentTypeID=${this.doctor.appointmentTypes[0].id}&calendarID=${this.doctor.calendarid}&date=${date.date}`, {auth: {username: process.env.ACUITYUSER, password: process.env.ACUITYPW}}))
        }
        return await Promise.all(dateRequests)
      },
      formatTimes (times) {
        // formated dates/times to show in the calendar
        this.formatedDates = times.map(day => {
          const fullDate = this.$dayjs(day[0].time, {locale: 'de'})
          return {
            date: fullDate.format('DD'),
            weekday: fullDate.format('dd'),
            month: fullDate.format('MMMM'),
            year: fullDate.year(),
            times: day.map(time => {

              return this.$dayjs(time.time, {locale: 'de'}).format('HH:mm')

            })
          }
        })
      },
      async setFormatedTimes() {
        const times = await this.getTimes()
        this.formatTimes(times)
      },
      pageOne() {
        return this.pagination.page < 2
      },
      async nextDates() {
        this.pagination.page += 1
        // if less then two pages of dates available
        if ((this.formatedDates.length - this.pagination.page * this.pagination.rowsPerPage) < 10) {

        }
        // if not load more and store them
      },
      prevDates() {
        if(this.pagination.page >= 2) {
          this.pagination.page -= 1
        }
      }
    },
    async created() {
      if (this.doctor) {
        await this.setFormatedTimes()
      }
    }
  }
</script>

<style scoped lang="scss">
  .loading {
    text-align: center;
    display: block;
    height: 30vw;
  }

  .prev {
    text-align: left;
  }
  .month {
    text-align: center;
    font-weight: bold;
    font-size: 20pt;
  }
  .next {
    text-align: right;
  }

  .timecontainer {
    padding: 0 !important;
  }

  .timebtn {
    align-self: center;
  }

  .dateContainer {
    margin: 15px 0;
    display: flex;
    justify-content: center;
    font-weight: bold;

    .date {
      font-size: 20pt;
    }

    .weekday {
      font-size: 15pt;
    }
  }
</style>