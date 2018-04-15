<template>
  <div>
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
    date: null
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
      now: Math.trunc((new Date()).getTime() / 1000),
      event: this.date
    }
  },
  computed: {
    calculatedDate () {
      let timestamp = Math.trunc(Date.parse(this.event) / 1000)

      // Check time
      let timeDiff = timestamp - this.now
      if (timeDiff <= 0) {
        this.$emit('break', true)
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
      this.now = Math.trunc((new Date()).getTime() / 1000)
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
