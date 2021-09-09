<template>
  <div class="booking-policy">
    <h2 class="title">HEY, THANKS FOR CHECKING IN!</h2>
    <div class="container" v-for="(block, i) in blocks" :key="i">
      <p v-for="line in block" :key="line">
        {{line}}
      </p>
      <h2 v-if="i === 0">Price & Time</h2>
      <p v-if="i === 1">-Coleene</p>
      <div class="terms" v-if="i === 1">
        <label class="switch" for="checkbox">
          <input type="checkbox" id="checkbox" v-model="accepted" />
          <div class="switch__slider"></div>
        </label>
        <p>I have read the message above and agree to all
          <router-link to="/policies" target="_blank">policies</router-link>.
        </p>
      </div>
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

export default {
  name: 'BookingPolicy',
  components: {
    HDButton,
  },
  data: () => ({
    blocks: POLICY_COPY,
    accepted: false,
  }),
  methods: {
    handleAccept() {
      this.$emit('accept');
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
    }
    p {
      margin: 10px 0;
    }
    .terms {
      display: flex;
      align-items: center;
      margin: 25px 0 10px;
      p {
        margin-left: 10px;
        line-height: 1;
        a {
          font-size: inherit;
        }
      }
      .switch {
        $size: 28px;
        $halfSize: $size / 2;
        display: inline-block;
        height: $halfSize;
        position: relative;
        width: $size;
        input {
          display:none;
          &:checked ~ .switch {
            &__slider {
              background-color: $hdRed;
              &:before {
                transform: translate($halfSize, -50%);
              }
            }
          }
        }
        &__slider {
          background-color: #ccc;
          bottom: 0;
          cursor: pointer;
          left: 0;
          position: absolute;
          width: $size;
          height: $halfSize;
          border-radius: $halfSize;
          right: 0;
          top: 0;
          transition: all 300ms $easeOutMaterial;
          &:before {
            background-color: #fff;
            content: "";
            height: calc(100% - 4px);
            width: calc(50% - 4px);
            position: absolute;
            transition: all 300ms $easeOutMaterial;
            border-radius: 50%;
            left: 2px;
            top: 50%;
            transform: translate(0%, -50%);
          }
        }
      }
    }
  }
}
</style>
