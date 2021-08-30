<template>
  <booking v-if="isAdmin" />
  <form v-else :onsubmit="handleSubmit" class="admin-form" :class="{ error: adminError }">
    <input type="text" placeholder="Username" v-model="user.name">
    <input type="password" placeholder="Password" v-model="user.password">
    <button>Login</button>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Booking from './Booking.vue';

export default {
  name: 'Admin',
  components: { Booking },
  data: () => ({
    user: {
      name: '',
      password: '',
    },
  }),
  computed: {
    ...mapGetters(['isAdmin']),
    ...mapState(['adminError']),
  },
  mounted() {
    if (!this.isAdmin) this.setPageLoaded(true);
  },
  methods: {
    ...mapActions(['setPageLoaded', 'authAdmin']),
    handleSubmit(e) {
      e.preventDefault();
      this.authAdmin(this.user);
    },
  },
};
</script>

<style lang="scss">
.admin-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  &.error {
    input {
      border: 1px solid $hdRed;
    }
  }
  input {
    margin: 7.5px 0;
  }
}
</style>
