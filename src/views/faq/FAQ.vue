<template>
  <div>

    <!-- <section>
      <v-layout column wrap align-center style="background-color: white; padding-bottom: 40px">
        <v-flex md12>
          <img src="/static/img/picto/piggy-lost2.png" alt="avatar" width="200" style="margin-top: 30px">
        </v-flex>
      </v-layout>
    </section> -->

    <section>
      <v-layout column wrap align-center style="background-color: white; padding-top: 40px; padding-bottom: 40px">
        <v-flex md12>
          <img src="/static/img/picto/PIGGY_StillConfused_512.png" alt="avatar" width="200">
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex md10 style="width: 100%">
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex md10 offset-md1>
                <h1 class="display-1 grey-text">{{ $t('lang.faq.title')}}</h1>
              </v-flex>
              <v-flex md10 offset-md1>
                <!-- Getting Started -->
                <app-getting-started titleRequired="true"></app-getting-started>
                <!-- /Getting Started -->

                <!-- Understanding -->
                <h2 class="grey-text headline" style="padding-top: 35px;">{{ $t('lang.faq.understanding.title')}}</h2>
                <v-expansion-panel expand>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whatisPiggyBreaker.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whatisPiggyBreaker.text[0]')}}<br /><br />
                        {{ $t('lang.faq.understanding.whatisPiggyBreaker.text[1]')}}<br />
                        {{ $t('lang.faq.understanding.whatisPiggyBreaker.text[2]')}}<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/2-three-pigs.png" />
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whocanplayPiggyBreaker.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whocanplayPiggyBreaker.text[0]')}}
                        <br />
                        <br />
                        <span class="caption">{{ $t('lang.faq.understanding.whocanplayPiggyBreaker.text[1]')}}</span>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whydoineedtoplay.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whydoineedtoplay.text[0]')}}<br />
                        {{ $t('lang.faq.understanding.whydoineedtoplay.text[1]')}}<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/3-coins.png" /><br /><br />
                        {{ $t('lang.faq.understanding.whydoineedtoplay.text[2]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whataremychancesofwinning.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whataremychancesofwinning.text[0]')}}<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/4-piggy-contribute.png" />
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whodecidestobreak.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whodecidestobreak.text[0]')}}<br />
                        <ul>
                          <li class="padli"><span v-html="dialogMessage2"></span></li>
                          <li class="padli"><span v-html="dialogMessage3"></span><br /></li>
                        </ul><br />
                        <img style="max-width: 100%" src="/static/img/faq/5-break-piggy.png" /><br /><br />
                        <span class="caption">{{ $t('lang.faq.understanding.whodecidestobreak.text[1]')}}</span>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whatistheprerequisite.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whatistheprerequisite.text[0]')}}<br />
                        {{ $t('lang.faq.understanding.whatistheprerequisite.text[1]')}}<br />
                        <br />
                        {{ $t('lang.faq.understanding.whatistheprerequisite.text[2]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.howdoiplay.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.howdoiplay.text[0]')}}<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/6-contribute.png" /><br /><br />
                        {{ $t('lang.faq.understanding.howdoiplay.text[1]')}}<br />
                        <br />
                        {{ $t('lang.faq.understanding.howdoiplay.text[2]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whatistheminimumtoplay.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whatistheminimumtoplay.text[0]')}}<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/7-contribute-minimum.png" /><br /><br />
                        {{ $t('lang.faq.understanding.whatistheminimumtoplay.text[1]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.howdoibreak.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.howdoibreak.text[0]')}}<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/8-break-button.png" /><br /><br />
                        {{ $t('lang.faq.understanding.howdoibreak.text[1]')}}<br />
                        <ul>
                          <li class="padli"><span v-html="dialogMessage2"></span></li>
                          <li class="padli"><span v-html="dialogMessage3"></span><br /></li>
                        </ul><br />
                        <span class="caption">{{ $t('lang.faq.understanding.howdoibreak.text[4]')}}</span>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.whathappenswhenbroken.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.whathappenswhenbroken.text[0]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.understanding.howdoiknowwhowon.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.understanding.howdoiknowwhowon.text[0]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                </v-expansion-panel>
                <!-- /Understanding -->

                <!-- Other -->
                <h2 class="grey-text headline" style="padding-top: 35px;">{{ $t('lang.faq.other.title')}}</h2>
                <v-expansion-panel expand style="margin-bottom: 35px">

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.other.whysocomplicated.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.other.whysocomplicated.text[0]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.other.whatisether.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.other.whatisether.text[0]')}}<br />
                        {{ $t('lang.faq.other.whatisether.text[1]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.other.whatisgas.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.other.whatisgas.text[0]')}}<br />
                        <br />
                        {{ $t('lang.faq.other.whatisgas.text[1]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.other.caniuseacard.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.other.caniuseacard.text[0]')}}<br />
                        {{ $t('lang.faq.other.caniuseacard.text[1]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.other.caniplaywithphone.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.other.caniplaywithphone.text[0]')}}<br />
                        {{ $t('lang.faq.other.caniplaywithphone.text[1]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{ $t('lang.faq.other.howareyoumakingmoney.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{ $t('lang.faq.other.howareyoumakingmoney.text[0]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">{{$t('lang.faq.other.howdoireach.title')}}</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        {{$t('lang.faq.other.howdoireach.text[0]')}}<br />
                        {{$t('lang.faq.other.howdoireach.text[1]')}} <a href="mailto:contact@piggybreaker.com">contact@piggybreaker.com</a>{{ $t('lang.faq.other.howdoireach.text[2]')}}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                </v-expansion-panel>
                <!-- /Other -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>

import GettingStarted from '@/views/faq/GettingStarted'

export default {
  computed: {
    dialogMessage2 () {
      return this.$t('lang.faq.understanding.howdoibreak.text[2]')
    },
    dialogMessage3 () {
      return this.$t('lang.faq.understanding.howdoibreak.text[3]')
    }
  },
  components: {
    appGettingStarted: GettingStarted
  }
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
