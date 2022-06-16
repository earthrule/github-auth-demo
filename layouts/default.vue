<template>
  <div>
    <template v-if="$auth.$state.loggedIn">
      <div :text="$auth.user.name">
        <a @click="$auth.logout()">
          Logout
        </a>
      </div>
      <img
        :src="picture"
      />
    </template>
    <template v-else>
      <a to="/login"> Login </a>
    </template>
    <nuxt />
  </div>
</template>

<script>
import get from 'lodash.get'

export default {
  name: 'IndexPage',
  computed: {
    picture() {
      return (
        get(this.$auth.user, 'picture') || // OpenID
        get(this.$auth.user, 'picture.data.url') || // Facebook graph API
        get(this.$auth.user, 'avatar_url')
      ) // GitHub
    }
  }
}
</script>
