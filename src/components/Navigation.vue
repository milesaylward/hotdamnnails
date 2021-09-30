<template>
  <div class="navigation">
    <div class="navigation__content container">
      <a @click="handleClick(false)" class="navigation__logo">
        <Logo />
      </a>
      <ul class="navigation__items">
        <li class="navigation__items__item">
          <a @click="handleClick(true)">Designs</a>
        </li>
        <li class="navigation__items__item">
          <router-link to="/policies">Policies</router-link>
        </li>
        <li class="navigation__items__item">
          <router-link to="/booking">Booking</router-link>
        </li>
      </ul>
      <div
        class="navigation__mobile-icon"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div
        class="navigation__mobile-menu"
        :class="{ open: menuOpen }"
      >
      <div
        class="navigation__mobile-menu__overlay"
        @click="menuOpen = false;"
      />
        <ul class="navigation__mobile-menu__items">
          <a
            class="navigation__mobile-menu__items__item"
            @click="handleClick"
          >
            Designs
          </a>
          <router-link
            to="/policies"
            class="navigation__mobile-menu__items__item"
          >Policies</router-link>
          <router-link
            to="/booking"
            class="navigation__mobile-menu__items__item"
          >
            Booking
          </router-link>
        </ul>
      </div>
    </div>
    <div class="navigation__border"></div>
    <div class="navigation__border navigation__border--right"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from '@/assets/svg/header_logo.svg';
import EventBus from '@/core/eventBus';

export default {
  name: 'Navagation',
  data: () => ({
    menuOpen: false,
  }),
  components: {
    Logo,
  },
  computed: {
    ...mapGetters(['isMobile']),
    isHome() {
      return this.$route.name === 'Home';
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
  watch: {
    $route() {
      this.menuOpen = false;
    },
  },
  methods: {
    handleClick(priceClick) {
      this.menuOpen = false;
      if (priceClick && this.$route.hash === '#designs') {
        this.menuOpen = false;
        return;
      }
      if (this.isHome) {
        if (priceClick) {
          this.$router.replace({ path: '/', hash: '#designs' });
          EventBus.emit('scrollToPricing');
        } else {
          this.$router.replace({ path: '/', hash: '' });
          EventBus.emit('scrollToTop');
        }
      } else if (priceClick) {
        this.$router.push({ name: 'Home', hash: '#designs' });
      } else {
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>

<style lang="scss">
.navigation {
  position: fixed;
  width: 100%;
  height: $headerHeightMobile;
  @include bpMedium {
    height: $headerHeight;
  }
  top: 0;
  left: 0;
  // box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.4);
  z-index: 50;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px 0;
  &__border {
    @include checkeredBorder;
    &--right {
      @include checkeredBorder(false);
      transform-origin: top right;
      transform: rotate(-90deg) translate(-100%, -5px) scaleX(-1);
      left: auto;
      right: 0;
    }
  }
  &__mobile-menu {
    position: fixed;
    left: 0;
    top: $headerHeightMobile;
    width: 100%;
    height: 100%;
    z-index: 1000;
    pointer-events: none;
    @include bpMedium {
      display: none;
    }
    &.open {
      pointer-events: initial;
      visibility: visible;
      .navigation__mobile-menu {
        &__overlay { opacity: 1; }
        &__items { transform: translateX(0); }
      }
    }
    &__overlay {
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      opacity: 0;
      transition: opacity 350ms $easeOutMaterial;
    }
    &__items {
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      background: white;
      width: 60%;
      list-style: none;
      padding: 0;
      margin: 0;
      transform: translateX(100%);
      transition: transform 350ms $easeOutMaterial;
      &__item {
        display: block;
        width: 100%;
        font-size: 28px;
        text-align: center;
        padding: 15px 0;
        text-transform: uppercase;
        border-bottom: none;
        color: $hdRed;
        cursor: pointer;
      }
    }
  }
  &__content {
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__mobile-icon {
    width: 25px;
    height: 15px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s $easeOutMaterial;
    @include bpMedium {
      display: none;
    }
    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: $hdRed;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: .25s $easeOutMaterial;
      &:nth-child(1) { top: 0px; }
      &:nth-child(2), &:nth-child(3) { top: 50%; }
      &:nth-child(4) { top: 100%; }
    }
    &.open {
      span {
        &:nth-child(1) {
          top: 50%;
          width: 0%;
          left: 50%;
        }
        &:nth-child(2) { transform: rotate(45deg); }
        &:nth-child(3) { transform: rotate(-45deg); }
        &:nth-child(4) {
          top: 50%;
          width: 0%;
          left: 50%;
        }
      }
    }
  }
  &__logo {
    display: flex;
    width: 45%;
    max-width: 200px;
    min-width: 150px;
    border: none;
    flex-shrink: 0;
    max-height: 100%;
    svg {
      height: 100%;
      width: 100%;
    }
  }
  &__items {
    padding: 0;
    list-style: none;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    display: none;
    @include bpMedium {
      display: flex;
    }
    &__item {
      margin: 0 15px;
      &:last-child {
        margin-right: 0;
      }
      a {
        text-transform: uppercase;
        font-size: 16px;
        cursor: pointer;
        @include bpMedium {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
