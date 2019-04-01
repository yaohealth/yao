<template>
  <div class="doc">
    <md-card>
      <md-card-area md-inset>
        <md-card-media md-ratio="1:1">
          <img src="~assets/doc.png">
        </md-card-media>

        <md-card-header>
          <h2 class="md-title">Dr. Pepper</h2>
          <div class="md-subhead">
            <md-icon>location_on</md-icon>
            <span>2 km</span>
          </div>

        </md-card-header>

        <md-card-content>
          Osteopathy, Acupuncture
        </md-card-content>
      </md-card-area>

      <md-card-content class="dates">
        <h3 class="md-subheading">Next available days</h3>
        <div class="card-reservation">
          <md-icon>access_time</md-icon>
          <div class="md-button-group">
            <md-button>Fr. 13.3</md-button>
            <md-button>Sa. 14.3</md-button>
            <md-button>Mo. 16.3</md-button>
          </div>
        </div>
      </md-card-content>

      <md-card-actions class="moreButton">
        <md-button class="md-primary">Show more</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
  }

  .md-card {
    .md-subhead {
      .md-icon {
        $size: 16px;

        width: $size;
        min-width: $size;
        height: $size;
        font-size: $size !important;
      }

      span {
        vertical-align: middle;
      }
    }

    .card-reservation {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .md-icon {
        margin: 8px;
      }
    }

    .md-button-group {
      display: flex;

      .md-button {
        min-width: 60px;
        border-radius: 2px;
      }
    }
  }
  .md-card-header {
    padding: 10px 0  10px 0;
  }

  .md-card-content {
    padding: 0;
    padding-bottom: 5px;
  }

  .dates {
    padding-top: 5px;
  }

  .md-subheading {
    font-weight: bold;
  }

  .moreButton {
    padding: 0 8px 8px 8px;
  }
</style>