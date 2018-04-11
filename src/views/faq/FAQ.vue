<template>
  <div>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex md12 style="width: 100%">
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex md12>
                <h1 class="headline">FAQ</h1>
              </v-flex>
              <v-flex md12>
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

                <h2>Understanding CryptoPiggy</h2>
                <v-expansion-panel expand>

                  <v-expansion-panel-content>
                    <div slot="header">What is CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        CryptoPiggy is a game centered around a nice little Piggy bank where everyone can contribute with ether (ETH) to let it grow... and grow... and grow... until it reaches very large amounts.<br />
                        <img src="/static/img/faq/2-three-pigs.png" />
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">Who can play CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Anyone.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">Why do I need to play CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        The value of ether (ETH) contained in the Piggy is indicated in the middle of the homepage.<br />
                        Some day, the Piggy will contain a lot of ether (ETH), and it will be time to break it.<br />
                        <img src="/static/img/faq/3-coins.png" /><br />
                        A winner will then be chosen “randomly” between all contributors to win ether (ETH) contained in the Piggy.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">What are my chances to win?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        You’re the one who decides. The more you contribute, the more chances you have to win. Indeed, your chances to win the lottery are proportional to the total amount of your contributions.<br />
                        <img src="/static/img/faq/4-piggy-contribute.png" />
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">Who decides to break the Piggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Anyone who contributed can decide to break the Piggy, excepted when there has been a contribution within the last 3 minutes*.<br />
                        <img src="/static/img/faq/5-break-piggy.png" /><br />
                        *After a year of existence, the Piggy is not protected by this rule anymore.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">What is the prerequisite to play CryptoPiggies?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        You need to have the Metamask plugin installed on your web browser. Your Metamask account needs to contain ether (ETH).<br />
                        <br />
                        NB: If you don’t have ether (ETH) on a Metamask account, please report to the first section of the FAQ.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">How do I play CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Just press the big yellow “Contribute” button, indicate the amount of your contribution and click “Confirm”.<br />
                        <img src="/static/img/faq/6-contribute.png" /><br />
                        This will open the Metamask plugin. Confirm the ether transaction and that’s it.<br />
                        <br />
                        NB: If you don’t have ether (ETH) on Metamask, please report to the first section of the FAQ.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">What is the minimum amount to play CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        The value of the minimum contribution to play CryptoPiggy is indicated below the "Contribute" button.<br />
                        <img src="/static/img/faq/7-contribute-minimum.png" /><br />
                        The minimum contribution can go up or down with time.It increases when the frequency of player contributions increases.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">How do I break the Piggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Press the big “Break the Piggy” button. This will open the Metamask plugin. Confirm the transaction and that’s it.<br />
                        <img src="/static/img/faq/8-break-button.png" /><br />
                        You need to be a contributor to access this feature. You can’t break the Piggy. You can’t break the Piggy if a contribution occured in the last minutes.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">What happens once the Piggy is broken?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        A Piggy reparation fee is paid to the programmer at the end of the game. The broken Piggy is replaced by a new empty Piggy.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                </v-expansion-panel>

                <h2>Other</h2>
                <v-expansion-panel expand>

                  <v-expansion-panel-content>
                    <div slot="header">Why is it so complicated to get started with CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        CryptoPiggy is built on blockchain technology, which is relatively new stuff. It’s safe and secure, but it’s going to be a little complicated until the rest of the world catches up.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">What’s ether (ETH)? Why do I need it to play CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Ether powers the Ethereum network, which is what CryptoPiggy is built on. Ether acts like any other currency; the value fluctuates with the market.<br />
                        You need to convert your currency (e.g. USD, CAD, GBP, etc.) into ether to pay for things on our network.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">What is 'gas'?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        'Gas' is a shorthand used to describe the cost of powering a transaction or contract in Ethereum, which is the blockchain network that CryptoPiggy is built on.<br />
                        <br />
                        Because blockchain is decentralized, every transaction is distributed through multiple computers, not a central server. This ensures each transaction—is secure and one-of-a-kind. However, it also takes more computational power, which is covered by the cost of gas. Ethereum typically communicates this cost in gwei (1 million gwei = 1 ether/ETH). You can get a more detailed explanation here.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">Can I use a Credit Card to play CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Not directly; the technology simply isn’t there yet. As soon as it is, we plan to support it.<br />
                        However, most exchanges do let you buy ether with a credit card.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">Can I play CryptoPiggy with my phone?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Not yet. CryptoPiggy relies on technologies that simply don’t function on mobile devices, like MetaMask.<br />
                        We are developing a mobile app, but you will need a laptop, desktop, or tablet browser to complete transactions for the foreseeable future.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">How are you making money with CryptoPiggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        We take 3.75% of the Piggy value when the Piggy is broken. Note that we are working hard to make your game as easy as possible to use and to prepare you a mobile version.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header">How do I reach the CryptoPiggy team regarding a project, partnership, or investment opportunity?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        CryptoPiggy was developed by Valanter, a blockchain startup. Give us the details here and we’ll be in touch.<br />
                        If none of the above has been helpful, please contact us with the details of your issue at contact@CryptoPiggy.co. Please include any relevant tx hashes, links, and Piggy IDs so we can support you as quickly as possible.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                </v-expansion-panel>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
</script>

<style scoped>
h2 {
  margin: 20px 0 10px 0;
}
</style>
