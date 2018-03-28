<template>
  <div>
    *feature available in:
    <span v-if="days">
      {{ days | two_digits }}
      Days,
    </span>
    <span v-if="days || hours">
      {{ hours | two_digits }}
      Hours,
    </span>
      {{ minutes | two_digits }}
      Minutes,
      {{ seconds | two_digits }}
      Seconds
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
      return timestamp
    },
    seconds () {
      return (this.calculatedDate - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.calculatedDate - this.now) / 60) % 60
    },
    hours () {
      return Math.trunc((this.calculatedDate - this.now) / 60 / 60) % 24
    },
    days () {
      return Math.trunc((this.calculatedDate - this.now) / 60 / 60 / 24)
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
