<template>
  <form class="user-form" ref="form" :onsubmit="handleSubmit" novalidate>
    <h1>Client Information</h1>
    <hr />
    <div class="input" v-for="input in inputs" :key="input.id">
      <input
        :type="input.type"
        :id="input.id"
        required
        @change="updateInfo($event, input.id)"
        @keydown="updateInfo($event, input.id)"
        :class="{ filled: formData[input.id] }"
      >
      <span class="input__border"></span>
      <label class="input__label" :for="input.id">{{input.label}}</label>
      <span class="input__icon material-icons">{{input.icon}}</span>
    </div>
    <transition name="fade">
      <p class="error" v-if="showError">
        Please check that all fields are filled out & correct.
      </p>
    </transition>
    <div class="terms">
      <label class="switch" for="checkbox">
        <input type="checkbox" id="checkbox" v-model="accepted" />
        <div class="switch__slider"></div>
      </label>
      <p>I have read and agree to all
        <router-link to="/policies" target="_blank">policies</router-link>.
      </p>
    </div>
    <HDButton
      copy="Book Now"
      class="submit"
      :disabled="!accepted"
    />
  </form>
</template>

<script>
import { USER_INPUTS } from '@/core/constants';
import HDButton from './HDButton.vue';

export default {
  name: 'UserForm',
  components: {
    HDButton,
  },
  data: () => ({
    inputs: USER_INPUTS,
    formData: {
      email: '',
      name: '',
      number: '',
    },
    accepted: false,
    showError: false,
  }),
  mounted() {
    console.log(this.accepted);
  },
  methods: {
    updateInfo(e, name) {
      this.formData[name] = e.target.value;
      this.showError = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      let valid = true;
      Object.keys(this.formData).forEach((key) => {
        const input = document.getElementById(key);
        if (!input.validity.valid) valid = false;
      });
      if (valid) {
        this.$emit('book', this.formData);
      } else {
        this.showError = true;
      }
    },
  },
};
</script>

<style lang="scss">
.user-form {
  width: 100%;
  padding-bottom: 100px;
  margin-top: -75px;
  h1 {
    font-size: 24px;
    text-transform: uppercase;
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
  }
  .input {
    position: relative;
    margin: 20px 0 0;
    padding: 10px 5px;
    width: 100%;
    @include bpMedium {
      max-width: 250px;
    }
    input {
      width: 100%;
      border: none;
      height: 100%;
      padding-left: 25px;
      &:focus, &.filled {
        outline: none;
        ~ .input {
          &__border {
            border-color: $hdRed;
          }
          &__label {
            transform: translate(-15px, -185%) scale(.85);
          }
        }
      }
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
    }
    &__icon, &__label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &__icon {
      left: 5px;
      font-size: 18px;
      pointer-events: none;
    }
    &__label {
      left: 30px;
      background: white;
      pointer-events: none;
      text-transform: uppercase;
      color: $hdRed;
      padding: 0 5px;
      transition: transform 150ms $easeOutMaterial;
    }
    &__border {
      pointer-events: none;
      border-radius: 4px;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid $lightGrey;
      transition: border 300ms $easeOutMaterial;
      top: 0;
      left: 0;
    }
  }
  .submit {
    margin-top: 10px;
    width: 100%;
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
  .error {
    color: $hdRed;
    margin: 20px 0 15px;
    transition: opacity 300ms $easeOutMaterial;
  }
}
</style>
