<template>
<div class="switch" @click="checked = !checked">
  <label class="switch__switch" :for="id">
    <input type="checkbox" :id="id" v-model="checked" />
    <div class="switch__switch__slider"></div>
  </label>
  <slot>

  </slot>
</div>
</template>

<script>
export default {
  name: 'Switch',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    checked: false,
  }),
  watch: {
    checked(val) {
      this.$emit('switchChange', val);
    },
  },
};
</script>

<style lang="scss">
.switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  .small {
    font-size: 85%;
    margin-left: 5px;
  }
  &__switch {
    $size: 40px;
    $halfSize: $size / 2;
    pointer-events: none;
    display: inline-block;
    height: $halfSize;
    position: relative;
    width: $size;
    margin-right: 10px;
    input {
      display:none;
      &:checked ~ .switch__switch {
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
</style>
