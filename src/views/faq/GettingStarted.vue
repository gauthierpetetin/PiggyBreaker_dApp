<template>
  <div>
    <section>
      <h2 v-if="titleRequired" class="grey-text headline">{{ $t('lang.faq.gettingStarted.title') }}</h2>
      <!-- <v-expansion-panel-content @input="saveId('1')">
      <div @mouseover="onOver" @mouseleave="onLeave"> -->
      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.gettingStarted.whatDoIneedToPlay.title') }}</div>
          <v-card>
            <v-card-text class="white grey--text pad">
              {{ $t('lang.faq.gettingStarted.whatDoIneedToPlay.text[0]') }}
              <ul>
                <li class="padli">{{ $t('lang.faq.gettingStarted.whatDoIneedToPlay.text[1]') }}</li>
                <li class="padli">{{ $t('lang.faq.gettingStarted.whatDoIneedToPlay.text[2]') }}</li>
                <li class="padli">{{ $t('lang.faq.gettingStarted.whatDoIneedToPlay.text[3]') }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
          <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.gettingStarted.installingMetamaskYourWallet.title') }}</div>
          <v-card>
            <v-card-text class="white grey--text pad" style="position: relative">
              {{ $t('lang.faq.gettingStarted.installingMetamaskYourWallet.text[0]') }}
              <br />
              <span v-html="$t('lang.faq.gettingStarted.installingMetamaskYourWallet.text[1]')"></span>
              <br />
              <br />
              <iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/tfETpi-9ORs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
          <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.gettingStarted.whyMetamaskIsLocked.title') }}</div>
          <v-card>
            <v-card-text class="white grey--text pad">
              {{ $t('lang.faq.gettingStarted.whyMetamaskIsLocked.text[0]') }}
              <br />
              <br />
              <img  style="max-width: 100%" src="/static/img/faq/0-metamask-locked.png" />
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
          <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.gettingStarted.reinstallingMetamask.title') }}</div>
          <v-card>
            <v-card-text class="white grey--text pad">
              {{ $t('lang.faq.gettingStarted.reinstallingMetamask.text[0]') }}
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
          <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.gettingStarted.gettingEtherYourDigitalCurrency.title') }}</div>
          <v-card>
            <v-card-text class="white grey--text pad">
              <p v-html="$t('lang.faq.gettingStarted.gettingEtherYourDigitalCurrency.text[0]')"></p>
              <img style="max-width: 100%" src="/static/img/faq/1-metamask.png" />
              <br /><br />
              <p v-html="$t('lang.faq.gettingStarted.gettingEtherYourDigitalCurrency.text[1]')"></p>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

        <v-expansion-panel-content>
          <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.gettingStarted.howToSendEtherToMetamask.title') }}</div>
          <v-card>
            <v-card-text class="white grey--text pad">
              <p v-html="$t('lang.faq.gettingStarted.howToSendEtherToMetamask.text[0]')"></p>
              <p v-html="$t('lang.faq.gettingStarted.howToSendEtherToMetamask.text[1]')"></p>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/PtdMDtCVck0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>

      </v-expansion-panel>

      <div v-if="!titleRequired" style="margin-top: 70px; margin-bottom: 70px">
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px;">
          <v-flex md12 class="text-xs-center" style="margin: 0 0 !important">
            <img src="/static/img/picto/piggy-lost.png" alt="piggy locked" style="margin: 0 0; max-width: 200px">
          </v-flex>
          <h2 class="grey-text display-2" style="margin: 0 0 !important">{{ $t('lang.faq.stillConfused') }}</h2>
        </v-flex>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px; margin: 0 0 !important">
          <v-btn
          class="mt-3 warning"
          dark
          large
          to="/FAQ"
          >
          {{ $t('lang.faq.viewFullFAQ') }}
        </v-btn>
      </v-flex>
    </div>
  </section>

</div>
</template>

<script>

export default {
  // data () {
  //   return {
  //     ids: {}
  //   }
  // },
  props: {
    titleRequired: false
  },
  methods: {
    // onOver: function (e) {
    //   var hoverElement = e.target;
    //   console.log('hoverElement', hoverElement)
    //   hoverElement.childNode['det'].className = 'grey-text subheading padTitle'
    // },
    // onLeave: function (e) {
    //   var leftElement = e.target;
    //   leftElement.childNode['det'].className = 'grey--text subheading padTitle'
    // },
    // saveId(id) {
    //   if (this.ids[id]) {
    //     this.ids[id] = false
    //   } else {
    //     this.ids[id] = true
    //   }
    // }
  }
  // computed: {
  //   questionStyle() {
  //     let questionColor = onHover ? '#404040' : 'grey'
  //     return {
  //       color: questionColor
  //     }
  //   }
  // }
}
</script>

<style scoped>
  h2 {
    margin: 20px 0 10px 0;
  }

  .padTitle {
    padding: 10px 10px;
  }

  .pad {
    padding: 25px 30px;
    padding-top: 10px;
  }

  .padli {
    margin-left: 25px;
  }

</style>
