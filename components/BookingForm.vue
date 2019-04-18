<template>
  <v-container>

      <v-dialog width="60vw" v-model="show">
        <v-card>
          <v-layout  column justify-center fluid>
            <v-flex>
              <v-card-title>
                <h1>Termin buchen</h1>
              </v-card-title>
              <v-card-title>
                <span>{{selectedDate}}</span>
              </v-card-title>
            </v-flex>
            <v-flex>
              <v-card-text>
                <v-select @change="setTreatment" :items="getAppointmentNames(appointmentTypes)" label="Behandlung*"></v-select>
                <v-text-field v-model="firstname" label="Vorname*" :rules="[rules.required]"></v-text-field>
                <v-text-field v-model="lastname" label="Nachname*" :rules="[rules.required]"></v-text-field>
                <v-text-field v-model="email" label="Email*" :rules="[rules.required, rules.email]"></v-text-field>
                <v-text-field v-model="phonenumber" label="Telefon*" :rules="[rules.required]"></v-text-field>
                <small>*indicates required field</small>
              </v-card-text>
            </v-flex>

          <v-card-actions class="buttons">
            <v-btn color="rgba(51, 169, 181, 255)" flat @click.stop="show=false">Abbrechen</v-btn>
            <v-btn color="rgba(51, 169, 181, 255)" flat @click.stop="booking()">Buchen</v-btn>
          </v-card-actions>
          </v-layout>
        </v-card>
      </v-dialog>

  </v-container>
</template>

<script>
  export default {
    props: [
      'value',
      'appointmentTypes',
      'selectedDate'
    ],
    data() {
      return {
        rules: {
          required: v => !!v || 'Required.',
          email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        },
        treatmentselect: '',
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: ''
      }
    },
    methods: {
      getAppointmentNames: appointmentTypes =>  {
        return appointmentTypes.map(item => item.name)
      },
      booking: async function() {
        const treatmentID = this.appointmentTypes.find(item => item.name === this.treatmentselect)
        try {
          console.log('day',this.$dayjs(this.selectedDate, {locale: 'de'}).toISOString())
          let foo = this.$dayjs(this.selectedDate, {locale: 'de'})
          console.log('id',treatmentID.id)
          const res = await this.$axios.$post(`${process.env.ACUITYPROXY}/api/appointments`, {

              appointmentTypeID: treatmentID.id,
              datetime: this.$dayjs(this.selectedDate, {locale: 'de'}).toISOString(),
              firstName: this.firstname,
              lastName: this.lastname,
              email: this.email,
              phone: this.phonenumber,
              fields: [
                {
                  id: '6202825',
                  value: true
                }
              ]
            },{
            auth: {
              username: process.env.ACUITYUSER, password: process.env.ACUITYPW
            }})

          console.log(res)
        } catch (e) {
          console.log(e)
        }


        // bestätigung anzeigen
        // kalendar neu laden
      },
      setTreatment: function(option) {
        this.treatmentselect = option
      },
    },
    computed: {
      show: {
        get () {
          console.log('get is called')
          return this.value
        },
        set (value) {
          console.log('set is called', value)
          this.$emit('input', value)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .bookingDialog {
    width: 50vw;
    min-width: 300px;
    height: 90vh;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>