<template>
  <div class="booking-policy">
    <div class="container" v-for="(block, i) in blocks" :key="i">
      <h2>{{block.title}}</h2>
      <p v-for="line in block.lines" :key="line">
        {{line}}
      </p>
      <p v-if="i === 1">{{content.me}}</p>
      <label for="returning_client_code" v-if="i === 1" class="closed-label">
        Booking is currently closed to new clients.
        You may only book if you have a Returning Client Code
      </label>
      <div class="input-container" v-if="i === 1">
        <input
          type="text"
          name="returning_client_code"
          v-model="key"
          placeholder="Returning Client Code"
        />
        <transition name="fade">
          <div class="error" v-if="showErrorMessage">
            <Error class="error__icon" />
            <p>{{errorMessage}}</p>
          </div>
        </transition>
      </div>
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
import Error from '@/assets/svg/error.svg';
import HDButton from './HDButton.vue';
import Switch from './Switch.vue';

export default {
  name: 'BookingPolicy',
  components: {
    HDButton,
    Switch,
    Error,
  },
  data: () => ({
    accepted: false,
    key: '',
    errorMessage: '',
    showErrorMessage: false,
  }),
  computed: {
    ...mapGetters(['getContentByPath']),
    blocks() { return this.content.blocks; },
    content() { return this.getContentByPath('booking.policies'); },
    computedTerms() {
      return this.replaceString(this.content.terms, '/policies');
    },
  },
  watch: {
    key() {
      this.errorMessage = '';
      this.showErrorMessage = false;
    },
  },
  methods: {
    ...mapActions(['setPolicyAccepted', 'verifyClientKey']),
    handleAccept() {
      this.verifyClientKey({ key: this.key.trim() }).then((res) => {
        if (res.status !== 200) {
          this.errorMessage = res.message;
          this.showErrorMessage = true;
          return;
        }
        this.setPolicyAccepted(true);
      });
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
    .input-container {
      display: flex;
      flex-direction: column;
      @include bpMedium {
        flex-direction: row;
      }
      input {
        display: inline-flex;
        max-width: 300px;
        padding: 10px;
        &:focus {
          outline: $hdRed auto 1px;
        }
      }
      .error {
        display: flex;
        align-items: center;
        margin-top: 10px;
        @include bpMedium {
          margin-top: 0;
        }
        &__icon {
          width: 20px;
          height: 20px;
          margin: 0 10px 0 0;
          @include bpMedium {
            margin: 0 10px;
          }
        }
        p {
          color: $hdRed;
          margin: 0;
          // font-weight: bold;
        }
      }
    }
    .closed-label {
      margin: 20px 0 10px;
    }
  }
}
</style>
