<template>
  <div class="loader">
    <div class="loader__loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style lang="scss">
.loader {
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  &__loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: $hdRed;
    animation: spin 2s linear infinite;
    &:before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: $darkGrey;
      animation: spin 3s linear infinite;
    }
    &::after {
      content: '';
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: $lightGrey;
      animation: spin 1.5s linear infinite;
    }
  }
}
</style>
