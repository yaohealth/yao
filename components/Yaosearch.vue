<template>
    <div class="searchbar">
      <v-autocomplete
              v-model="choice"
              :items="items"
              color="blue-grey lighten-2"
              item-text="name"
              item-value="name"
              :multiple="true"
              placeholder="SEARCH FOR SYMPTOMS, CONDITIONS, DOCTORS, PRACTITIONERS"
              dense
              hide-no-data
              hide-selected
              deletable-chips
              :search-input.sync="search"
              @change="preventSearchAction"
              @input="checkType"
              return-object
              @keyup.enter="doSearch"
      >
        <template v-slot:item="data" @change="foo">
            <v-list-tile-avatar v-if="data.item.group === 'Therapy'">
              <v-icon>local_hospital</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-avatar v-if="data.item.group === 'Symptom'">
              <v-icon>bug_report</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
        </template>
        <!--TODO disable allow mouseover with tip to add items-->
        <template v-slot:append>
          <nuxt-link :to="{name: 'results', query: {search: choice}}" :class="!hasInput ? 'disabled' : ''">
            <v-icon @click.stop >search</v-icon>
          </nuxt-link>
        </template>
      </v-autocomplete>
    </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      items: [],
      choice: [],
      therapies: [],
      symptoms: [],
      go: false
    }
  },
  computed: {
    hasInput() {
      return this.choice.length > 0
    }
  },
  methods: {
    preventSearchAction: function() {
      // search is set to empty string so that the user input is reset and just the option is displayed
      this.search = ''
      // when we select an item in the dropdown we dont want that the keyup.enter fires and starts the search
      this.go = false
    },
    doSearch: function() {
      if (this.hasInput && this.go) {
        this.$router.push({name: 'results', query: {search: this.choice}})
      }
      this.go = true
    },
    // not really performant needs rewrite
    checkType: function(payload) {
      const newestItem = payload[payload.length -1]
      if (newestItem) {
        for(const item of this.items) {
          if(item.group !== newestItem.group) {
            item.disabled = true
          }
        }
      } else {
        for(const item of this.items) {
          item.disabled = false
        }
      }
    },
    buildItemList() {
      this.item = []
      this.items.push({ header: 'Therapies' })
      for(const therapy of this.therapies){
        this.items.push({name: therapy, group: 'Therapy', disabled: false})
      }
      this.items.push({ divider: true })
      this.items.push({ header: 'Symptoms & Conditions' })
      for(const symptom of this.symptoms){
        this.items.push({name: symptom.symptom, group: 'Symptom', disabled: false})
      }
    }
  },
  async created() {
    let therapies = []
    // set auth for yao api
    const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
    this.$http.setToken(x.toString('base64'), 'Basic')
    try {
      const specialities = await this.$http.$get(`${process.env.YAOAPI}/specialities`).catch(e => console.error('Error with YAO API:', e)) // show error page

      const x = new Buffer.from(`${process.env.YAOUSER}:${process.env.YAOPW}`)
      this.$http.setToken(x.toString('base64'), 'Basic')
      const symptoms = await this.$http.$get(`${process.env.YAOAPI}/symptoms`).catch(e => console.error('Error with YAO API:', e)) // show error page
      therapies = specialities.map( speciality => speciality.speciality)
      this.therapies = therapies
      this.symptoms = symptoms
      this.buildItemList()
    } catch (e) {
      console.error('Error with Acuity API:', e)
      //show Error Page
    }

  }
}

</script>


<style lang="scss" scoped>
  $yaoBase: #00afa4;

  .searchbar {
    width: 70vw;
    min-width: 400px;
  }

  .disabled {
    color: lightgrey;
    pointer-events: none;
  }


  $input-height: 40px;
  $input-border-radius: 15px;

  a {
    text-decoration: none;
  }

  /deep/ .v-text-field {
    font-family: Roboto;
    font-weight: 400;
    position: relative; // Allow label positioning (children cannot have "position")
    /*margin-top: 28px; // Add space for fixed label   // Removed by Patrick because it fucks up when you try to center it*/

    // Having relative position messes up labels.
    //   Labels must be positioned relative to ".v-text-field" (icon issues)
    .v-input__control,
    .v-input__slot,
    .v-text-field__slot,
    .v-menu,
    .v-menu__activator {
      position: unset;
    }

    // Align appended/preppended outer icons properly (must be fixed)
    .v-input__append-outer,
    .v-input__prepend-outer {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    // Align appended/preppended inner icons properly (can use flex)
    .v-input__append-inner,
    .v-input__prepend-inner {
      align-self: center;
      margin: 0;
      padding: 0;
    }
    .v-input__prepend-inner {
      margin-right: 8px;
    }
    .v-input__append-inner {
      margin-left: 8px;
    }

    // Input component/icons (above details)
    .v-input__slot {
      height: $input-height;
      padding: 4px 8px;
      border: 3px solid white;
      background-color: rgba(252, 252, 252, 0.5);
      border-radius: $input-border-radius;
      transition: border-color 0.2s ease-in-out;


      // make sure too long placeholders are not cut off but
      // rather end with dots
      ::placeholder {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      // Remove default input underline
      &:before {
        display: none;
      }
      &:after {
        display: none;
      }

      input {
        padding: 0; // Reset padding
      }

      label {
        transform: translateY(-34px); // Position label vertically
        font-size: 18px;
        transition: color 0.2s ease-in-out;
      }
    }

    // Disabled input
    &.v-input--is-disabled {
      .v-input__slot {
        background-color: #eeeeee;
      }
    }

    // Error state
    &.v-input--has-state.error--text:not(.v-input--is-focused) {
      .v-input__slot {
        border-color: #ff5252; // Replacement for 'underline' behaviour
      }
    }

    // Highlight currently focused field
    &.v-input--is-focused {
      .v-input__slot {
        border-color: $yaoBase; // Replacement for 'underline' behaviour
      }

      // When errors fields are focused only the border should change,
      //   and all other error colours should remain (label, icons, etc).
      &:not(.v-input--has-state):not(.error--text) {
        .v-label {
          color: $yaoBase !important; // Vuetify override (".primary--text")
        }

        // Focused icon colours
        .v-input__append-inner i,
        .v-input__append-outer i,
        .v-input__prepend-inner i,
        .v-input__prepend-outer i {
          color: $yaoBase !important; // Vuetify override (".primary--text")
          transition: color 0.15s ease-in-out; // Shorter transition to avoid "jump"
        }
      }
    }

    // Progress indicator
    .v-progress-linear {
      top: calc(#{$input-height} + 2px);
      left: #{$input-border-radius};
      width: calc(100% - #{$input-border-radius} * 2);
      border-radius: 2px;
    }
  }

  .v-select-list{
    background: none !important;
    border-radius: 8px !important;
  }


  // TODO is not getting selected properly
  /deep/.v-menu__content{
    background: none !important;
    border-radius: 8px !important;
  }

  /deep/.v-list {
    /*background-color: rgba(252, 252, 252, 0.5);*/
    background-color: white;
    border-radius: 8px !important;
    font-family: Roboto;
  }



  .menu__content--select {
    border-radius: 8px;
  }
</style>
