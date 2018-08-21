<template>
  <v-toolbar style="background-color: white;">
    <v-toolbar-title style="min-width: 250px">
      <router-link v-if="gameStarted" to="/home"  class="logo">
        <a class="nav-link" >
          <img src="/static/img/logo/logo-crypto-piggy.png" height="50">
          <span style="color: #2196f3">{{ $t('lang.app.title') }}</span>
        </a>
      </router-link>
      <router-link v-else to="/"  class="logo">
        <a class="nav-link" >
          <img src="/static/img/logo/logo-crypto-piggy.png" height="50">
          <span style="color: #2196f3">{{ $t('lang.app.title') }}</span>
        </a>
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items v-if="networkStatus == 'good'">
      <v-tooltip bottom>
        <v-btn flat slot="activator" class="metamask-status grey-text"><img src="/static/img/icon/circle-green.png"> {{ $t('lang.menu.network.status.good') }}</v-btn>
        <span>{{ $t('lang.menu.network.status.goodTooltip') }}</span>
      </v-tooltip>
    </v-toolbar-items>
    <v-toolbar-items v-else-if="networkStatus == 'bad'">
      <v-tooltip bottom>
        <v-btn flat slot="activator" class="metamask-status"><img src="/static/img/icon/circle-red.png"> {{ $t('lang.menu.network.status.bad') }}</v-btn>
        <span>{{ $t('lang.menu.network.status.badTooltip') }}</span>
      </v-tooltip>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <div v-if="ethereumEnv == 'development'">
      <!-- <v-toolbar-items>
        <div class="white--text" style="background-color: #E91E63;margin:15px;padding: 5px 10px;">{{ $t('lang.menu.network.testnet') }}</div>
      </v-toolbar-items> -->
      <v-spacer></v-spacer>
    </div>
    <v-toolbar-items>
      <v-btn class="grey-text" to="invite" flat>{{ $t('lang.menu.invite') }}</v-btn>
      <v-btn class="grey-text" to="piggies" flat>{{ $t('lang.menu.history') }}</v-btn>
      <v-btn class="grey-text" to="settings" flat v-show="gameStarted && metamaskEnabled">{{ $t('lang.menu.settings') }}</v-btn>
      <v-btn class="grey-text" to="faq" flat>{{ $t('lang.menu.faq') }}</v-btn>
      <v-btn class="grey-text" to="about" flat>{{ $t('lang.menu.about') }}</v-btn>
      <!-- <v-btn class="grey-text" v-if="$i18n.locale != 'en'" @click="translateTo('en')" flat><flag iso="cn" /></v-btn>
      <v-btn class="grey-text" v-if="$i18n.locale != 'cn'" @click="translateTo('cn')" flat><flag iso="gb" /></v-btn> -->
      <v-menu>
        <v-btn class="grey-text" slot="activator" flat><flag :iso="currentLanguage" /></v-btn>
        <v-list>
          <v-list-tile v-for="(language, index) in languages" :key="index" @click="translateTo(language.lang)">
            <flag style="margin-right: 10px" :iso="language.flag" /><v-list-tile-title class="grey-text">{{ language.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  data () {
    return {
      networkStatus: 'bad',
      ethereumEnv: process.env.ETHEREUM_NODE_ENV,
      languages: [
        {name: 'English', flag: 'gb', lang: 'en'},
        {name: 'Chinese', flag: 'cn', lang: 'cn'}
      ]
    }
  },
  computed: {
    gameStarted () {
      return this.$store.state.gameStarted
    },
    metamaskEnabled () {
      return this.$store.state.metamaskEnabled
    },
    currentLanguage () {
      if (this.$i18n.locale === 'en') {
        return 'gb'
      } else {
        return this.$i18n.locale
      }
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (typeof web3 !== 'undefined') {
        this.networkStatus = 'good'
      } else {
        console.log('Please install / unlock Metamask first. See below for more details.')
      }
    },
    translateTo (lang) {
      console.log('translateTo !')
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped>

.logo  {
  text-decoration: none;
}

.logo img {
  vertical-align:middle;
}

.metamask-status {
  margin: 15px 0 0 0;
  padding-left: 50px;
}

.metamask-status img {
  margin: 0 5px 2px 0;
}

</style>
