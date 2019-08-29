<template>
  <v-container>
      <v-dialog width="80vw" v-model="show">
        <v-card>
          <v-layout column justify-center fluid>
            <v-flex>
              <v-card-title>
                <h1>{{ $t('booking.title') }}</h1>
              </v-card-title>
              <v-card-title>
                <span>{{selectedDate}}</span>
              </v-card-title>
            </v-flex>
            <v-flex>
              <v-card-text>
                <v-select @change="setTreatment" :items="getAppointmentNames(appointmentTypes)" :label="$t('booking.treatment')"></v-select>
                <v-text-field v-model="firstname" :label="$t('booking.firstname')" :rules="[rules.required]"></v-text-field>
                <v-text-field v-model="lastname" :label="$t('booking.lastname')" :rules="[rules.required]"></v-text-field>
                <v-text-field v-model="email" label="Email*" :rules="[rules.required, rules.email]"></v-text-field>
                <v-text-field v-model="phonenumber" :label="$t('booking.phone')" :rules="[rules.required]"></v-text-field>
                <small>{{ $t('booking.hint') }}</small>
                <v-checkbox v-model="agb" :rules="[rules.required]" :label="$t('booking.agb')"></v-checkbox>
              </v-card-text>
            </v-flex>
          <v-card-actions class="buttons">
            <v-btn color="rgba(51, 169, 181, 255)" flat @click.stop="show=false">{{ $t('booking.cancel') }}</v-btn>
            <v-btn color="rgba(51, 169, 181, 255)" :disabled="!agb" flat @click.stop="booking()">{{  $t('booking.book') }}</v-btn>
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
        phonenumber: '',
        agb: false
      }
    },
    methods: {
      getAppointmentNames: appointmentTypes =>  {
        return appointmentTypes.map(item => item.name)
      },
      booking: async function() {
          const treatmentID = this.appointmentTypes.find(item => item.name === this.treatmentselect)
          try {
            const foo = await this.$http.$post(`acuity/appointments`, {
              appointmentTypeID: treatmentID.id,
              datetime: this.$dayjs(this.selectedDate, {locale: this.$i18n.locale}).toISOString(),
              firstName: this.firstname,
              lastName: this.lastname,
              email: this.email,
              phone: this.phonenumber,
              fields: [
                {
                  // id is the id of the agb field
                  id: '6202825',
                  value: this.agb
                }
              ]
            })
            this.show = false
            this.emptyForm()
            // emit event to parent component
            this.$emit('booked', this.selectedDate)
          } catch (e) {
            // emit event to parent component
            this.$emit('failed')
            console.log(e)
          }
      },
      emptyForm: function() {
        this.treatmentselect = ''
        this.firstname = ''
        this.lastname = ''
        this.email = ''
        this.phonenumber = ''
        this.agb = false
      },
      setTreatment: function(option) {
        this.treatmentselect = option
      },
    },
    computed: {
      show: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>
