<template>
  <div id="countdown">
    <app-dialog-contribute></app-dialog-contribute>
    <app-dialog-break></app-dialog-break>
    <app-dialog-withdraw></app-dialog-withdraw>
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
    bottom: 40px;
    left: 40px;
  }

</style>
