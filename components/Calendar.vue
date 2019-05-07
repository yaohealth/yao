<template>
  <v-container v-if="formatedDates.length > 0" fluid grid-list-md align-content-space-between>
    <v-data-iterator
            :items="formatedDates"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            hide-actions
    >
      <template v-slot:header>
          <v-layout class="header">
            <v-flex class="prev"><v-btn flat :disabled="!!isPageOne()" @click="prevPage">prev</v-btn></v-flex>
            <v-flex class="month">{{shownMonth}}</v-flex>
            <v-flex class="next"><v-btn flat @click="nextPage">next</v-btn></v-flex>
          </v-layout>
          <v-divider></v-divider>
      </template>
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
    <BookingForm  v-model="showBooking" :selectedDate="selectedDate" :appointmentTypes="doctor.appointmentTypes" @booked="successfulBooking" @failed="failedBooking"></BookingForm>
  </v-container>
  <h1 class="loading" v-else>Calendar is loading.....</h1>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
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
    computed: {
      shownMonth() {
        return this.formatedDates[this.pagination.page * this.pagination.rowsPerPage - 1].month
      }
    },
    methods: {
      ...mapGetters({
        getSpecificDoctor: 'localStorage/getSpecificDoctor'
      }),
      ...mapMutations({
        ADD_DATES: 'localStorage/ADD_DATES',
        ADD_FORMATED_DATES: 'localStorage/ADD_FORMATED_DATES'
      }),
      openBookingDialog(date) {
        this.selectedDate = date
        this.showBooking = true
      },
      async setFormatedTimes() {
        let tmpTimes = []
        for (const type of this.doctor.appointmentTypes) {
          const times = await this.getTimes(type)
          this.formatTimes(times, type)
        }

        // update the array which is displayed
        this.doctor.appointmentTypes.forEach(type => {
          type.availableDates.forEach(date => {
            if(date.formatedDates) {
              tmpTimes.push(date.formatedDates)
            }
          })
        })
        this.formatedDates = tmpTimes
      },
      async getTimes (type) {
        const dateRequests = []
        let nextDates = type.availableDates.filter(date => {
          if (!date.formatedDates) {
            return date
          }
        })

        nextDates = nextDates.splice(0,10)

        for(const date of nextDates) {
          dateRequests.push(this.$http.$get(`${process.env.ACUITYPROXY}/api/availability/times?appointmentTypeID=${type.id}&calendarID=${this.doctor.calendarid}&date=${date.date}`))
        }

        return await Promise.all(dateRequests).catch(e => console.error("error in getTimes", e))
      },
      formatTimes (times, type) {
        this.ADD_FORMATED_DATES({id: this.doctor.iddoctorprofile, times, type})
      },
      isPageOne() {
        return this.pagination.page < 2
      },
      async nextPage() {
        await this.nextDates()
        this.pagination.page += 1
      },
      async nextDates() {
        if ((this.formatedDates.length - this.pagination.page * this.pagination.rowsPerPage) <= 5) {
          const lastDate = this.doctor.appointmentTypes[0].availableDates[this.doctor.appointmentTypes[0].availableDates.length - 1].date
          let newDate = this.$dayjs(lastDate).add(1, 'day')
          for (let i = 0; i < 10; i++) {
            // adds available dates
            this.ADD_DATES({date: newDate.format('YYYY-MM-DD'), id: this.doctor.iddoctorprofile})
            newDate = this.$dayjs(newDate).add(1, 'day')
          }

          await this.setFormatedTimes()
        }
      },
      prevPage() {
        if(this.pagination.page >= 2) {
          this.pagination.page -= 1
        }
      },
      successfulBooking(date) {
        // find the booked time and remove it from the calendar
        const fullDate = this.$dayjs(date, {locale: 'de'})
        const dateDetails = {
          date: fullDate.format('DD'),
          month: fullDate.format('MMMM'),
          time: fullDate.format('HH:mm')
        }
        const resultDate = this.formatedDates.find(value => {
          return value.date === dateDetails.date && value.month == dateDetails.month
        })
        resultDate.times = resultDate.times.filter(time => time !== dateDetails.time)
        this.$emit('successfulBooking')
      },
      failedBooking() {
        this.$emit('failedBooking')
      }
    },
    async created() {
      if (this.doctor && this.doctor.appointmentTypes) {
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