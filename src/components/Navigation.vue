<template>
  <div class="navigation">
    <div class="navigation__content container">
      <router-link to="/" class="navigation__logo">
        <Logo />
      </router-link>
      <ul class="navigation__items">
        <li class="navigation__items__item">
          <router-link to="/policies">Policies</router-link>
        </li>
        <li class="navigation__items__item">
          <router-link to="/booking">Booking</router-link>
        </li>
      </ul>
      </div>
  </div>
</template>

<script>
import Logo from '@/assets/svg/header_logo.svg';

export default {
  name: 'Navagation',
  components: {
    Logo,
  },
};
</script>

<style lang="scss">
.navigation {
  position: fixed;
  width: 100%;
  height: $headerHeight;
  top: 0;
  left: 0;
  // box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.4);
  z-index: 10;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px 0;
  &__content {
    max-height: 100%;
  }
  &__drip {
    width: 105%;
    height: 120px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 100%);
    z-index: -1;
    path {
      fill: white;
    }
  }
  &__logo {
    display: flex;
    width: 50%;
    border: none;
    flex-shrink: 0;
    max-height: 100%;
    svg {
      max-height: 100%;
      max-width: 100%;
    }
  }
  &__items {
    padding: 0;
    display: flex;
    list-style: none;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    &__item {
      margin: 0 15px;
      &:last-child {
        margin-right: 0;
      }
      a {
        text-transform: uppercase;
        font-size: 14px;
        @include bpMedium {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
