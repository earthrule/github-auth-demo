<template>
  <div>
    <div class="text-center">
      <h3>Welcome to Nuxt.js auth example</h3>
      This demo is using auth-module v{{ version }}
      <div>
        <template v-if="$auth.$state.loggedIn">
          <nuxt-link to="/secure"> Secure </nuxt-link>
          <a @click="$auth.logout()">
            Logout
          </a>
        </template>
        <nuxt-link v-else variant="success" to="/login"> Login </nuxt-link>
      </div>
    </div>
    <div>
      User status:
      <li>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</li>
    </div>
  </div>
</template>
<script>
import { version } from '/package.json'
export default {
  name: 'IndexPage',
  computed: {
    version: () => version
  }
}
</script>
