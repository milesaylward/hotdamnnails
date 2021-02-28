<template>
  <div class="page page--home">
    <div class="container">
      <Logo class="logo" />
      <div class="links">
        <router-link to="/policies" class="link">Policies</router-link>
        <a href="https://app.acuityscheduling.com/schedule.php?owner=21110176" target="_blank" class="link">Book</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/assets/svg/logo.svg';

export default {
  name: 'Home',
  components: {
    Logo,
  },
};
</script>

<style lang="scss">
.page {
  .container {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      max-width: 450px;
      margin-bottom: 4rem;
    }
    .links {
      width: 100%;
      display: flex;
    }
    .link {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 10px;
      border: 1px solid $black;
      border-radius: 4px;
      padding: .75rem 2rem;
      color: $black;
      background: $white;
      text-decoration: none;
      font-family: $headlineFontFamily;
      text-transform: uppercase;
      font-size: 24px;
      transition:
        background 250ms $easeOutMaterial,
        color 250ms $easeOutMaterial,
        border-color 250ms $easeOutMaterial;
      &:hover {
        background: $hdRed;
        border-color: $hdRed;
        color: white;
      }
    }
  }
}
</style>
