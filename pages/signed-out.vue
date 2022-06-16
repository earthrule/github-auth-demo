<template>
  <div>
    <b-alert show variant="info"> You have been signed out! </b-alert>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  auth: false
})
</script>
