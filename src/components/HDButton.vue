<template>
  <button class="hd-button" @click="$emit('buttonClick')" :class="buttonClasses">
    <span v-html="computedCopy" />
  </button>
</template>
<script>
export default {
  name: 'HDButton',
  props: {
    copy: {
      type: String,
    },
    color: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const classes = [this.color];
      if (this.active) classes.push('active');
      if (this.inactive) classes.push('inactive');
      if (this.disabled) classes.push('disabled');
      return classes;
    },
    computedCopy() {
      const computedCopy = this.copy;
      const small = this.copy.match(/\((.*)\)/);
      return small ? computedCopy.replace(/\((.*)\)/, `<span class="small">${small[0]}</span>`) : computedCopy;
    },
  },
};
</script>

<style lang="scss">
.hd-button {
  cursor: pointer;
  font-family: $headlineFontFamily;
  background: rgba($hdRed, 0.03);
  border: none;
  padding: 10px 20px;
  color: #777;
  text-transform: uppercase;
  transition: background 300ms $easeOutMaterial,
              color 300ms $easeOutMaterial,
              opacity 300ms $easeOutMaterial;
  @include on-hover {
    background: $hdRed;
    color: white;
    opacity: 1;
  }
  &.red {
    background: $hdRed;
    color: white;
    @include on-hover {
      background: darken($hdRed, 10%);
      opacity: 1;
    }
  }
  &.active {
    background: $hdRed;
    color: white;
  }
  &.inactive {
    opacity: 0.35;
  }
  &.disabled {
    opacity: 0.35;
    pointer-events: none;
  }
  span {
    line-height: 1.2;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.small {
      font-size: 12px;
      display: block;
      & ~ br {
        display: none;
      }
    }
  }
}
</style>
