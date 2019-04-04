<template>
  <section class="container">
    <Navbar/>
    <div class="bg">
      <div class="searchContainer">
          <form action="submit">
            <div class="search">
              <label>WAS</label>
              <input autofocus placeholder=" Ostheopath, TCM ..." class="searchInput" v-model="message"/>
            </div>
            <nuxt-link :to="{name: 'results', query: { search:message } }">
              <button type="submit" class="search-button">Search</button>
            </nuxt-link>
          </form>
      </div>
    </div>
    <div class="betaInfo">
      <div>
        <p>YAO is the first platform dedicated to CAM</p>
        <p>Search and book for your next appointment</p>
        <p>We only support BERLIN for the BETA VERSION</p>
      </div>
    </div>
    <v-layout align-center justify-space-around row>

        <Doc v-for="doctor in doctors" :title="doctor.title" :firstname="doctor.firstname" :lastname="doctor.lastname" :speciality="doctor.speciality" :key="doctor.id"></Doc>
    </v-layout>
    <div class="whatIsYao">
      <div>
        <p>WHAT IS YAO?</p>
      </div>
    </div>
    <div class="network">
      <div id="networkImage">
        <img src="~assets/network.jpg" alt="">
        <div id="networkTextContainer">
          <div id="networkText">
            <h2>1. Netzwerk</h2>
            <p>Bei Fragen oder Behandlungswünschen steht ihnen das Netzwerk zur verfügung</p>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar">
      <div id="calendarImage">
        <img src="~assets/calendar.jpg" alt="">
        <div id="calendarTextContainer">
          <div id="calendarText">
            <h2>2. Termin</h2>
            <p>Buchen Sie online einen Termin</p>
          </div>
        </div>
      </div>
    </div>
    <Yaofooter></Yaofooter>
  </section>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Doc from '@/components/Doc'
  import Yaofooter from '@/components/Yaofooter'

export default {
  components: {
    Navbar,
    Doc,
    Yaofooter
  },
  data() {
    return {
      message: ''
    }
  },
  async asyncData({ $axios }) {
    return $axios.$get(`http://localhost:3000/doctors/`).then(data => {
      const newdata = []
      let tmp = data.slice()
      for (let i = 0; i < 3; i++) {
        newdata.push(tmp.splice(Math.ceil(Math.random() * 10) % tmp.length, 1)[0])
      }
      return {doctors : newdata}
    }, reason => {
      return {doctors: []}
    })
  }
}
</script>

<style lang="scss" scoped>
$yao: rgba(51, 169, 181, 255);
.container {
  min-height: 100vh;
  text-align: center;
  padding: 0;
  margin: 0;
}

.searchContainer {
  width: 80vw;
  min-width: 400px;
  height: 80px;
  margin: 0 auto;
  position: relative;
  top: 40vh;
  background-color: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  form {
    display: flex;
  }

  .search {
    display: flex;
    align-items: center;
    width: 50vw;
  }

  label {
    color: $yao;
    font-size: 20pt;
  }

  ::placeholder {
    color: white;
  }

  .searchInput {
    background-color: $yao;
    color: white;
    border: none;
    height: 30px;
    width: 30vw;
    margin-left: 20px;
  }

  .search-button {
    width: 100px;
    height: 30px;
    background-color: $yao;
    color: white;
    font-size: 16px;
    border-radius: 16px;
    border: none;
  }

  .search-button:hover {
    background-color: white;
    color: $yao;
    border: 1px solid $yao;
  }

}

.betaInfo {
  position: relative;
  background-color: $yao;
  height: 30vw;

  div {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p{
      color: white;
      font-size: 4vw;
      line-height: 110%;
    }
  }

}

.bg {
  background: url("../assets/landing.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
}

.docPreview {
  margin: 5vw 0 5vw 0;
}

.whatIsYao {
  background: url("../assets/herb.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
  div {
    position: relative;
    float: left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    p {
      color: $yao;
      font-size: 13vw;
    }
  }
}

.network {
  height: 40vw;

  #networkImage {
    position: relative;
    margin: 4vh 0 0 4vw;
    width: 40vw;
    img {
      width: 45vw;
    }
    #networkTextContainer {
      position: absolute;
      top: 50%;
      left: 85%;
      width: 55vw;
      height: 20vw;
      min-height: 100px;
      background-color: black;
      #networkText {
        text-transform: uppercase;
        color: white;
        h2 {
          font-size: 4vw;
          padding-top: 4vw;
        }
        p {
          font-size: 1.5vw;
          line-height: 2;
          padding: 3vw 1vw 0 1vw;
        }
      }
    }
  }
}

.calendar {
  height: 40vw;
  display: flex;
  justify-content: flex-end;
  #calendarImage {
    float: right;
    position: relative;
    margin: 4vh 6vw 0 0;
    width: 40vw;
    img {
      width: 45vw;
    }
    #calendarTextContainer {
      position: absolute;
      top: 50%;
      right: 85%;
      width: 55vw;
      height: 16vw;
      min-height: 100px;
      background-color: black;
      #calendarText {
        text-transform: uppercase;
        color: white;
        h2 {
          font-size: 4vw;
          padding-top: 4vw;
        }
        p {
          font-size: 1.5vw;
          line-height: 2;
          padding: 3vw 1vw 0 1vw;
        }
      }
    }
  }
}
</style>
