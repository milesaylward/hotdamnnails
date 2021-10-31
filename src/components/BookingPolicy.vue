<template>
  <div class="booking-policy">
    <div class="container" v-for="(block, i) in blocks" :key="i">
      <h2>{{block.title}}</h2>
      <p v-for="line in block.lines" :key="line">
        {{line}}
      </p>
      <p v-if="i === 1">{{content.me}}</p>
      <Switch
        class="terms"
        v-if="i === 1"
        id="termsSwitch"
        @switchChange="handleSwitchChange"
      >
      <p v-html="computedTerms" />
      </Switch>
      <HDButton
        v-if="i === 1"
        :copy="content.button"
        :disabled="!accepted"
        color="red"
        @click="handleAccept"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HDButton from './HDButton.vue';
import Switch from './Switch.vue';

export default {
  name: 'BookingPolicy',
  components: {
    HDButton,
    Switch,
  },
  data: () => ({
    accepted: false,
  }),
  computed: {
    ...mapGetters(['getContentByPath']),
    blocks() { return this.content.blocks; },
    content() { return this.getContentByPath('booking.policies'); },
    computedTerms() {
      return this.replaceString(this.content.terms, '/policies');
    },
  },
  methods: {
    ...mapActions(['setPolicyAccepted']),
    handleAccept() {
      this.setPolicyAccepted(true);
    },
    handleSwitchChange(val) {
      this.accepted = val;
    },
    replaceString(string, link) {
      return string.replace(
        /{{(.+?)}}/,
        (match, inner) => `<a href="${link}" target="_blank">${inner}</a>`,
      );
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
