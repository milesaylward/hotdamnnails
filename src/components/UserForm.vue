<template>
  <form class="user-form" ref="form" :onsubmit="handleSubmit" novalidate>
    <h1 class="title">Client Information</h1>
    <hr />
    <div class="input" v-for="input in inputs" :key="input.id" :class="[input.id]">
      <input
        :type="input.type"
        :id="input.id"
        required
        @change="updateInfo($event, input.id)"
        @keydown="updateInfo($event, input.id)"
        :class="[input.id, { filled: formData[input.id] }]"
      >
      <span class="input__border"></span>
      <label class="input__label" :for="input.id">{{input.label}}</label>
    </div>
    <transition name="fade">
      <p class="error" v-if="showError">
        Please check that all fields are filled out & correct.
      </p>
    </transition>
    <HDButton
      copy="Book Now"
      class="submit"
      :disabled="showError"
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
      firstName: '',
      lastName: '',
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
  padding: {
    bottom: 140px;
    left: 14px;
    right: 14px;
  };
  margin-top: -175px;
  position: relative;
  z-index: 13;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 700px;
  h1.title {
    font-size: 24px;
    width: 100%;
    text-transform: uppercase;
    padding: 0;
  }
  hr {
    width: 100%;
  }
  .input {
    position: relative;
    margin: 20px 0 0;
    padding: 10px 5px;
    width: 100%;
    &.firstName, &.lastName {
      width: 48%;
    }
    input {
      width: 100%;
      border: none;
      height: 100%;
      padding-left: 5px;
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
      left: 10px;
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

  .error {
    color: $hdRed;
    margin: 20px 0 15px;
    transition: opacity 300ms $easeOutMaterial;
  }
}
</style>
