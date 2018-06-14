<template>
  <div id="countdown">
    <app-dialog-contribute button-small="true"></app-dialog-contribute>
    <app-dialog-break button-small="true" masterTimerButton="true"></app-dialog-break>
    <app-dialog-withdraw button-small="true"></app-dialog-withdraw>
  </div>
</template>

<script>

import DialogContribute from '@/views/contribute/DialogContribute.vue'
import DialogBreak from '@/views/contribute/DialogBreak.vue'
import DialogWithdraw from '@/views/contribute/DialogWithdraw.vue'

export default {

  components: {
    AppDialogContribute: DialogContribute,
    AppDialogBreak: DialogBreak,
    AppDialogWithdraw: DialogWithdraw
  }

}

</script>

<style scoped>

  #countdown {
    position: fixed;
    bottom: 140px;
    right: 40px;
  }

</style>
