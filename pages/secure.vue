<template>
  <div>
    <p> This is a secure page! </p>
    <div>
      <pre>{{ state }}</pre>
      <div>
          User: <b-badge>{{ $auth.hasScope('user') }}</b-badge> Test:
          <b-badge>{{ $auth.hasScope('test') }}</b-badge> Admin:
          <b-badge>{{ $auth.hasScope('admin') }}</b-badge>
        <div v-if="$auth.strategy.token">
          <div style="white-space: nowrap; overflow: auto">
            {{ $auth.strategy.token.get() || '-' }}
          </div>
        </div>
        <div v-if="$auth.strategy.refreshToken" title="refresh token">
          <div style="white-space: nowrap; overflow: auto">
            {{ $auth.strategy.refreshToken.get() || '-' }}
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <button @click="$auth.fetchUser()"> Fetch User </button>
      <button @click="refreshTokens"> Refresh Tokens </button>
      <button @click="$auth.logout()"> Logout </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  },
  methods: {
    refreshTokens() {
      this.$auth.refreshTokens().catch((e) => {
        this.error = e + ''
      })
    }
  }
})
</script>
