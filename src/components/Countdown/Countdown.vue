<template>
  <div class="grey--text">
    * feature available in:
      {{ minutes | two_digits }}
      mins,
      {{ seconds | two_digits }}
      secs
  </div>
</template>

<script>
export default {
  props: {
    serverTimestamp: null,
    breakDatetime: null
  },
  filters: {
    two_digits (value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    }
  },
  data () {
    return {
      // now: Math.trunc((new Date(this.serverTimestamp)).getTime() / 1000),
      now: Math.trunc(this.serverTimestamp),
      timeDiff: null
    }
  },
  computed: {
    calculatedDate () {
      // let timestamp = Math.trunc(Date.parse(this.event) / 1000)
      let timestamp = Math.trunc(this.breakDatetime)
      // Check time
      let timeDiff = timestamp - this.now
      if (timeDiff <= 0) {
        // Send to parent
        this.$emit('enablebreak', true)
      }
      return timestamp
    },
    seconds () {
      return (this.calculatedDate - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.calculatedDate - this.now) / 60) % 60
    }
  },
  mounted () {
    window.setInterval(() => {
      // this.now = Math.trunc((new Date(this.serverTimestamp)).getTime() / 1000)
      this.now += 1
    }, 1000)
  }
}
</script>

<style scoped>
.block {
  float: left;
  margin: 20px;
}
.text {
  text-align: center;
}
.digit {
  margin: 10px;
  text-align: center;
}
</style>
