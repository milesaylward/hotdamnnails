<template>
  <div class="booking-policy">
    <h2 class="title">HEY, THANKS FOR CHECKING IN!</h2>
    <div class="container" v-for="(block, i) in blocks" :key="i">
      <p v-for="line in block" :key="line">
        {{line}}
      </p>
      <h2 v-if="i === 0">Price & Time</h2>
      <p v-if="i === 1">-Coleene</p>
      <Switch
        class="terms"
        v-if="i === 1"
        id="termsSwitch"
        @switchChange="handleSwitchChange"
      >
        <p>I have read the message above and agree to all
          <router-link to="/policies" target="_blank">policies</router-link>.
        </p>
      </Switch>
      <HDButton
        v-if="i === 1"
        copy="I AM READY TO BOOK"
        :disabled="!accepted"
        color="red"
        @click="handleAccept"
      />
    </div>
  </div>
</template>

<script>
import { POLICY_COPY } from '@/core/constants';
import HDButton from './HDButton.vue';
import Switch from './Switch.vue';

export default {
  name: 'BookingPolicy',
  components: {
    HDButton,
    Switch,
  },
  data: () => ({
    blocks: POLICY_COPY,
    accepted: false,
  }),
  methods: {
    handleAccept() {
      this.$emit('accept');
    },
    handleSwitchChange(val) {
      this.accepted = val;
    },
  },
};
</script>

<style lang="scss">
.booking-policy {
  padding: 30px 0;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  h2 {
    font-size: 28px;
    padding: 0 16px;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;
    h2 {
      padding: 0;
      margin-top: 15px;
    }
    p {
      margin: 10px 0;
    }
    .hd-button {
      height: 60px;
    }
    .terms {
      display: flex;
      align-items: center;
      margin: 25px 0 10px;
      p {
        margin-left: 15px;
        line-height: 1;
        a {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
