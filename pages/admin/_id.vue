<template>
  <v-app>
    <section class="mycontainer">
      <Navbar/>
      <div>
        <v-tabs
                centered
                color="#074f65"
                dark
                icons-and-text
                v-if="doctorData.length > 0"
        >
          <v-tab href="#tab-1">
            Personal Details
            <v-icon>account_box</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Media
            <v-icon>public</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Description
            <v-icon>description</v-icon>
          </v-tab>

          <v-tab href="#tab-4">
            Specialities
            <v-icon>local_hospital</v-icon>
          </v-tab>

          <v-tab-item value="tab-1">
            <v-card flat>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].title"
                                label="Title"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].firstname"
                                label="First name"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].lastname"
                                label="Last name"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].praxisname"
                                label="Praxisname"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].street"
                                label="Street"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].housenumber"
                                label="Housenumber"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].zipcode"
                                label="Zipcode"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].city"
                                label="City"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].state"
                                label="State"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].country"
                                label="Country"
                                required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].contactmail"
                                label="Contactmail"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].phonenumber"
                                label="Phonenumber"
                                required
                        ></v-text-field>
                      </v-flex>

<!--                      <v-flex xs12 md4>-->
<!--                        <v-btn>picture upload</v-btn>-->
<!--                      </v-flex>-->

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].website"
                                label="Website"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].facebook"
                                label="Facebook"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].twitter"
                                label="Twitter"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].youtube"
                                label="Youtube"
                                required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 md4>
                        <v-text-field
                                v-model="doctorData[0].instagram"
                                label="Instagram"
                                required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3">
            <v-card flat>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 md4 v-for="description in descriptions" :key="description.id">
                        <v-layout>
                          <v-flex xs11>
                            <v-text-field v-model="description.header" placeholder="Title"></v-text-field>
                          </v-flex>
                          <v-flex xs1 align-self-center>
                            <v-btn icon @click="deleteDescription(description)" :ref="description.id"><v-icon>delete</v-icon></v-btn>
                          </v-flex>
                        </v-layout>
                        <v-textarea solo v-model="description.body" placeholder="Description"></v-textarea>
                      </v-flex>
                      <v-flex xs4 align-self-center>
                        <v-btn @click="addNewDescription">Add new description</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-4">
            <v-card flat>
              <v-card-text>
                <v-form v-model="valid">
                  <v-container>
                    <v-layout row wrap>
                      <v-spacer></v-spacer>
                      <v-flex xs12 sm6>
                        <v-select
                                v-model="doctorData[0].speciality"
                                :items="specialities"
                                item-text="speciality"
                                item-value="speciality"
                                :menu-props="{ maxHeight: '400' }"
                                label="Specialities"
                                multiple
                                hint="Pick your specialties"
                                persistent-hint
                                dense
                        ></v-select>
                      </v-flex>
                      <v-spacer></v-spacer>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-btn @click="updateProfile">Save</v-btn>
        <v-spacer></v-spacer>
      </div>
      <Yaofooter></Yaofooter>

    </section>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Yaofooter from '@/components/Yaofooter'

  export default {
    components: {
      Navbar,
      Yaofooter
    },
    data() {
      return {
        doctorData: {
          type: Array,
          default: []
        },
        descriptions: [],
        specialities: [],
        valid: false
      }
    },
    computed: {
      user () { return (this.$store.state.auth || {}).user || null }
    },
    methods: {
      async updateProfile() {
        await this.$http.post(`doctor/${this.user.user.id}`, { doctor: this.doctorData })
        await this.$http.post(`description/${this.user.user.id}`, { descriptions: this.descriptions })
        await this.$http.post(`specialities/${this.user.user.id}/${this.doctorData[0].iddoctorprofile}`, { specialities: this.doctorData[0].speciality })
        // snackbar succsess or failour
      },
      addNewDescription() {
        this.descriptions.push({iddescription: null, iddoctorprofile: this.doctorData[0].iddoctorprofile, header: '', body: ''})
      },
      async deleteDescription(description) {
        const descriptionIndex = this.descriptions.findIndex(elem => elem.header === description.header && elem.body === description.body)
        await this.$http.post(`description/delete/${this.user.user.id}`, { description: this.descriptions[descriptionIndex]})
        this.descriptions.splice(descriptionIndex, 1)
      }
    },
    async asyncData({$http, store}){

      /* TODO
       * verify input
       * on save get new latlong at backend
       * nicer structure ( maybe lines and headers for subsections)
       * add an photo (need actual S3 for that)
       */
      const user = (store.state.auth || {}).user
      const id = user.id || user.user.id
      const doctorData = await $http.$get(`doctor/${id}`)
      const descriptions = await $http.$get(`doctors/description/${doctorData[0].iddoctorprofile}`)
      const specialities = await $http.$get(`specialities`)
      return { doctorData, descriptions, specialities }
    }
  }
</script>

<style lang="scss">
  .v-tabs__bar {
    background: radial-gradient(circle at center, #074f65 0, #00afa4 100%);
  }
</style>