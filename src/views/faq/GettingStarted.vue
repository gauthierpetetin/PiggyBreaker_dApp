<template>

  <section>

    <h2 v-if="titleRequired" class="grey-text headline">Getting started</h2>

    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header" class="grey-text subheading padTitle">What do I need to play Piggy Breaker?</div>
        <v-card>
          <v-card-text class="white grey--text pad">
            Here’s what you need to get started:
            <ul>
              <li class="padli">A computer or laptop running the desktop version of Chrome or Firefox</li>
              <li class="padli">MetaMask, a digital wallet used specifically with web apps</li>
              <li class="padli">Ether, a form of digital payment that powers Piggy Breaker</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header" class="grey-text subheading padTitle">Installing MetaMask, your digital wallet</div>
        <v-card>
          <v-card-text class="white grey--text pad" style="position: relative">
            To use Piggy Breaker, you will need to install MetaMask, a digital wallet. You will need to put money in it to make your first purchase.
            <br />
            <strong>Note:</strong> A digital wallet like MetaMask acts like a bank account—treat it with respect and make sure you don’t forget your password or the seed words.
            <br />
            <br />
            <iframe class="center" width="560" height="315" src="https://www.youtube.com/embed/tfETpi-9ORs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header" class="grey-text subheading padTitle">Why is MetaMask locked?</div>
        <v-card>
          <v-card-text class="white grey--text pad">
            Occasionally the Piggy Breaker homepage displays a lock screen. This happens because MetaMask automatically locks your account after a certain period of time. To unlock simply click on the MetaMask extension and type in your password.
            <br />
            <br />
            <img  style="max-width: 100%" src="/static/img/faq/0-metamask-locked.png" />
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header" class="grey-text subheading padTitle">Reinstalling MetaMask</div>
        <v-card>
          <v-card-text class="white grey--text pad">
            Some users need to uninstall and reinstall MetaMask because they’ve experienced a bug. If you kept your seed words, this is very easy! Just delete the extension, reinstall it, and import your twelve seed words. Then your account information will automatically display again on the Piggy Breaker website.
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header" class="grey-text subheading padTitle">Getting Ether, your digital currency</div>
        <v-card>
          <v-card-text class="white grey--text pad">
            <p>
              <strong>For U.S. citizens only:</strong> you can buy ether (ETH) in MetaMask. ETH is a digital currency that enables our game to run.
            </p>
            <img style="max-width: 100%" src="/static/img/faq/1-metamask.png" />
            <br /><br />
            <p>
              <strong>For everyone else:</strong> you will need to purchase ETH from <a href="https://blockgeeks.com/guides/best-cryptocurrency-exchanges" target="_blank">an exchange</a>, and then transfer the ETH from your exchange wallet to your MetaMask wallet. Unfortunately, you cannot play Piggy Breaker with only an exchange account.<br />
              You cannot use USD/CAD to play Piggy Breaker — currencies need to be converted into ETH first.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header" class="grey-text subheading padTitle">How to send ETH to MetaMask</div>
        <v-card>
          <v-card-text class="white grey--text pad">
            <p>
              <strong>For U.S. citizens only:</strong> you are able to purchase ETH directly from the MetaMask wallet using the Coinbase widget. This is more convenient and doesn’t require you to create two accounts.
            </p>
            <p>
              <strong>For everyone else:</strong> you need to buy ETH from an exchange using normal fiat currency. Copy your MetaMask address by clicking on the large '...' next to your account, then select 'Copy Address to clipboard'. Go to your exchange, click 'Accounts', and select your ETH Wallet and click 'send'. Paste the MetaMask address in the box with the amount you'd like to transfer.
            </p>
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
        <h2 class="grey-text display-2" style="margin: 0 0 !important">Still confused?</h2>
      </v-flex>
      <v-flex md12 class="text-xs-center grey-text" style="font-size:28px; margin: 0 0 !important">
        <!-- <v-btn
          class="mt-3 warning"
          dark
          large
          to="FAQ"
        >
          View full FAQ
        </v-btn> -->
        <router-link to="/"  class="logo">
          View full FAQ
        </router-link>
      </v-flex>
    </div>
  </section>

</template>

<script>
// import { Router } from '/router/index.js';

export default {

  props: {
    titleRequired: false
  },
  methods: {
    goToFAQ: {
      // router.push({ path: `/src/views/faq` })
    }
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
