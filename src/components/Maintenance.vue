<template>
  <div class="maintenance">
    <Logo class="maintenance__logo" />
    <h2>
      Site is currently under maintenance please check back later.
    </h2>
  </div>
</template>

<script>
import Logo from '@/assets/svg/logo.svg';

export default {
  name: 'maintenance',
  components: { Logo },
};
</script>

<style lang="scss">
.maintenance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px 50px;
  &__logo {
    width: 80%;
    max-width: 350px;
  }
  h2 {
    margin-top: 50px;
    max-width: 600px;
    text-align: center;
  }

}
</style>
