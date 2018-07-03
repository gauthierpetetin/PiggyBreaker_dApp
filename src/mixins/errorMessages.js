export default {
  data () {
    return {
      waitMessage: 'Please wait 50-60 seconds until your transaction gets validated by the whole network.'
    }
  },
  methods: {
    metamaskTitle (lockStatus) {
      let errT = this.$t('lang.metamask.title.unknown')
      if (lockStatus === 'not_installed') {
        errT = this.$t('lang.metamask.title.install')
      } else if (lockStatus === 'locked') {
        errT = this.$t('lang.metamask.title.locked')
      } else if (lockStatus === 'wrong_network') {
        errT = this.$t('lang.metamask.title.network')
      }
      return errT
    },
    metamaskMessage (lockStatus) {
      let errM = this.$t('lang.metamask.message.unknown')
      if (lockStatus === 'not_installed') {
        errM = this.$t('lang.metamask.message.install')
      } else if (lockStatus === 'locked') {
        errM = this.$t('lang.metamask.message.locked')
      } else if (lockStatus === 'wrong_network') {
        errM = this.$t('lang.metamask.message.network')
      }
      return errM
    }
  }
}
