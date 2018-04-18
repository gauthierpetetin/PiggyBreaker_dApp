<template>

  <section>

    <h2>Getting started</h2>
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header">What do I need to play CryptoPiggy?</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            Here’s what you need to get started:
            <ul>
              <li>A computer or laptop running the desktop version of Chrome or Firefox</li>
              <li>MetaMask, a digital wallet used specifically with web apps</li>
              <li>Ether, a form of digital payment that powers Crypto Piggy</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Installing MetaMask, your digital wallet</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            To use CryptoPiggy, you will need to install MetaMask, a digital wallet. You will need to put money in it to make your first purchase.
            <br />
            <strong>Note:</strong> A digital wallet like MetaMask acts like a bank account—treat it with respect and make sure you don’t forget your password or the seed words.

            <iframe width="560" height="315" src="https://www.youtube.com/embed/tfETpi-9ORs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Why is MetaMask locked?</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            Occasionally the CryptoPiggy homepage displays a lock screen. This happens because MetaMask automatically locks your account after a certain period of time. To unlock simply click on the MetaMask extension and type in your password.
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Reinstalling MetaMask</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            Some users need to uninstall and reinstall MetaMask because they’ve experienced a bug. If you kept your seed words, this is very easy! Just delete the extension, reinstall it, and import your twelve seed words. Then your account information will automatically display again on the CryptoPiggy website.
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">Getting Ether, your digital currency</div>
        <v-card>
          <v-card-text class="grey lighten-3">
            <p>
              <strong>For U.S. citizens only:</strong> you can buy ether (ETH) in MetaMask. ETH is a digital currency that enables our game to run.
            </p>
            <img src="/static/img/faq/1-metamask.png" />
            <p>
              <strong>For everyone else:</strong> you will need to purchase ETH from <a href="https://blockgeeks.com/guides/best-cryptocurrency-exchanges" target="_blank">an exchange</a>, and then transfer the ETH from your exchange wallet to your MetaMask wallet. Unfortunately, you cannot play CryptoPiggy with only an exchange account.<br />
              You cannot use USD/CAD to play CryptoPiggy—currencies need to be converted into ETH first.
            </p>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">How to send ETH to MetaMask</div>
        <v-card>
          <v-card-text class="grey lighten-3">
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

  </section>
</template>

<script>
</script>

<style scoped>
h2 {
  margin: 20px 0 10px 0;
}
</style>
