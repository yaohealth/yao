<template>
  <v-container v-if="items.length > 0" fluid grid-list-md align-content-space-between>
    <v-layout class="header">
      <v-flex class="prev"><v-btn flat>prev</v-btn></v-flex>
      <v-flex class="month">{{items[0].month}}</v-flex>
      <v-flex class="next"><v-btn flat>next</v-btn></v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-data-iterator
            :items="items"
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
    <BookingForm  v-model="showBooking" :selectedDate="selectedDate" :appointmentTypes="appointmentTypes" ></BookingForm>
  </v-container>
  <h1 class="loading" v-else>Calendar is loading.....</h1>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BookingForm from '@/components/BookingForm'
  export default {
    watch: {
      'dates' : function (val, oldVal) {
        this.items = val
      }
    },
    components: {
      BookingForm
    },
    props: ['dates', 'appointmentTypes'],
    data() {
      return {
        doctor: {},
        pagination: {
          rowsPerPage: 5
        },
        items: this.dates,
        showBooking: false,
        selectedDate: ''
      }
    },
    methods: {
      // inital getDates is in doc -> saves it in vuex
      // move allDates to calendar
      // move getTimes from _id nach calendar
      // move formatDates to calendar
      // when rest of the month is loaded count how many dates are available
      // when available - display <= 5 --> load next month + available times  --> save in vuex



      // calendar next method takes next (rowPerPage) dates and displays them
      // check available - display <= 5 --> load next month
      // when in future display prev btn
      openBookingDialog(date) {
        console.log(date)
        this.selectedDate = date
        this.showBooking = true
      }
    },
    mounted() {
      console.log('mounted calendar')
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