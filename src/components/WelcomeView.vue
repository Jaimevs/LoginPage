<template>
    <h3>
        Welcome {{ username }}
    </h3>
</template>

<script>
import { GET_USERNAME } from '@/store/storeconstants'

export default {
  name: "WelcomeView",
  computed: {
    username() {
      return this.$store.getters[`auth/${GET_USERNAME}`]
    }
  }
}
</script>

<style>
</style>