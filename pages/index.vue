<template>
  <section class="container">
    <Navbar/>
    <div class="bg">
      <div class="searchContainer">
        <div class="search">
          <label>WAS</label>
          <input autofocus="true" placeholder="Ostheopath, TCM ..." class="searchInput" v-model="message"/>
        </div>
        <nuxt-link :to="{name: 'results', params: { search:message } }">
          <button type="submit" class="search-button">Search</button>
        </nuxt-link>
      </div>
    </div>
    <div class="betaInfo">
      <div>
        <p>YAO is the first platform dedicated to CAM</p>
        <p>Search and book for your next appointment</p>
        <p>We only support BERLIN for the BETA VERSION</p>
      </div>
    </div>
    <div class="docPreview md-layout md-alignment-center-space-around">
      <Doc></Doc>
      <Doc></Doc>
      <Doc></Doc>
    </div>
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
  </section>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Doc from '@/components/Doc'

export default {
  components: {
    Navbar,
    Doc
  },
  data() {
    return {
      message: ''
    }
  },
  async asyncData({ $axios }) {
/*    const ip = await $axios.$get('http://icanhazip.com')
    console.log(ip)
    return { ip }*/
  }
}
</script>

<style lang="scss" scoped>
$yao: rgba(51, 169, 181, 255);
.container {
  min-height: 100vh;
  text-align: center;
  padding: 0;
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
  height: 100%;

  #networkImage {
    position: relative;
    margin: 4vh 0 0 4vw;
    background-color: green;
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
  height: 100%;

  #calendarImage {
    float: right;
    position: relative;
    top: 8vw;
    margin: 4vh 4vw 0 0;
    background-color: green;
    width: 40vw;
    img {
      width: 45vw;
    }
    #calendarTextContainer {
      position: absolute;
      top: 50%;
      right: 85%;
      width: 55vw;
      height: 15vw;
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
