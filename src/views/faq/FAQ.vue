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
                <h1 class="display-1 grey-text">FAQs</h1>
              </v-flex>
              <v-flex md10 offset-md1>
                <!-- Getting Started -->
                <app-getting-started titleRequired="true"></app-getting-started>
                <!-- /Getting Started -->
                <h2 class="grey-text headline">Understanding Piggy Breaker</h2>
                <v-expansion-panel expand>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What is Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Piggy Breaker is the next world lottery!<br /><br />
                        The game is centered around Billy, a nice little Piggy bank where everyone can contribute with ether (ETH) to let it grow... and grow... and grow... until it reaches very large amounts.<br />
                        Someday the Piggy bank will break and make one of the players rich...<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/2-three-pigs.png" />
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">Who can play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Anyone.*
                        <br />
                        <br />
                        <span class="caption">*Nevertheless, the App is not intended for children under 13.</span>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">Why do I need to play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        The Piggy contains (or will contain) a lot of ether (ETH). You can follow its value, it is indicated in the middle of the homepage.<br />
                        Some day, the Piggy will be broken. A winner will then be chosen “randomly” between all contributors to win content of the Piggy.<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/3-coins.png" /><br /><br />
                        Get a chance to be this winner by playing Piggy Breaker!
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What are my chances to win?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        You’re the one who decides. The more you contribute, the more chances you have to win. Indeed, your chances to win the lottery are proportional to the total amount of your contributions.<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/4-piggy-contribute.png" />
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">Who decides to break the Piggy?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Anyone who contributed can decide to break the Piggy.<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/5-break-piggy.png" /><br /><br />
                        Protection rule: the Piggy can't be broken if a contribution occured within the last 3 minutes*.<br />
                        <span class="caption">*After 3 months of existence, the Piggy is not protected by this rule anymore.</span>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What is the prerequisite to play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        You need to have the Metamask plugin installed on your web browser.<br />
                        Your Metamask account needs to contain ether (ETH).<br />
                        <br />
                        NB: If you don’t have ether (ETH) on a Metamask account, please report to the first section of the FAQ.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">How do I play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Just press the big yellow “Contribute” button, indicate the amount of your contribution and click “Confirm”.<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/6-contribute.png" /><br /><br />
                        This will open the Metamask plugin. Confirm the ether transaction and that’s it.<br />
                        <br />
                        NB: If you don’t have ether (ETH) on Metamask, please report to the first section of the FAQ.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What is the minimum amount to play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        The value of the minimum contribution to play Piggy Breaker is indicated below the "Contribute" button.<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/7-contribute-minimum.png" /><br /><br />
                        The minimum contribution can go up or down with time. It increases when the frequency of player contributions increases.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">How do I break the Piggy?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Press the big “Break the Piggy” button. This will open the Metamask plugin. Confirm the transaction and that’s it.<br /><br />
                        <img style="max-width: 100%" src="/static/img/faq/8-break-button.png" /><br /><br />
                        You need to be a contributor to access this feature. Furthermore, the Piggy can't be broken if a contribution occured within the last 3 minutes.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What happens once the Piggy is broken?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        A Piggy reparation fee is paid to the programmer at the end of the game. The broken Piggy is replaced by a new empty Piggy.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">How do I know who won the lottery?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        The winner is kept secret for a short time once the Piggy gets broken. Due to security reasons we can't detail here, the winner becomes public once the next lottery has really started e.g. once the next lottery contains at least one contribution.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                </v-expansion-panel>

                <h2 class="grey-text headline">Other</h2>
                <v-expansion-panel expand>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">Why is it so complicated to get started with Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Piggy Breaker is built on blockchain technology, which is relatively new stuff. It’s safe and secure, but it’s going to be a little complicated until the rest of the world catches up.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What’s ether (ETH)? Why do I need it to play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Ether powers the Ethereum network, which is what Piggy Breaker is built on. Ether acts like any other currency; the value fluctuates with the market.<br />
                        You need to convert your currency (e.g. USD, CAD, GBP, etc.) into ether to pay for things on our network.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">What is 'gas'?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        'Gas' is a shorthand used to describe the cost of powering a transaction or contract in Ethereum, which is the blockchain network that Piggy Breaker is built on.<br />
                        <br />
                        Because blockchain is decentralized, every transaction is distributed through multiple computers, not a central server. This ensures each transaction—is secure and one-of-a-kind. However, it also takes more computational power, which is covered by the cost of gas. Ethereum typically communicates this cost in gwei (1 million gwei = 1 ether/ETH). You can get a more detailed explanation here.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">Can I use a Credit Card to play Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Not directly; the technology simply isn’t there yet. As soon as it is, we plan to support it.<br />
                        However, most exchanges do let you buy ether with a credit card.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">Can I play Piggy Breaker with my phone?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Not yet. Piggy Breaker relies on technologies that simply don’t function on mobile devices, like Metamask.<br />
                        We are developing a mobile app, but you will need a laptop, desktop, or tablet browser to complete transactions for the foreseeable future.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">How are you making money with Piggy Breaker?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        We take 3.75% of the Piggy value when the Piggy gets broken. Note that we are working hard to make your game as easy as possible to use and to prepare you a mobile version.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <div slot="header" class="grey-text subheading padTitle">How do I reach the Piggy Breaker team regarding a project, partnership, or investment opportunity?</div>
                    <v-card>
                      <v-card-text class="white grey--text pad">
                        Give us the details here and we’ll be in touch.<br />
                        If none of the above has been helpful, please contact us with the details of your issue at <a href="mailto:contact@piggybreaker.com">contact@piggybreaker.com</a>. Please include any relevant tx hashes, links, and Piggy IDs so we can support you as quickly as possible.
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

import GettingStarted from '@/views/faq/GettingStarted'

export default {

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
</style>
