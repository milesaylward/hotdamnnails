<template>
  <div class="modal-manager">
    <div class="modal-manager__bg" @click.self="closeModal"/>
    <div class="modal-manager__content">
      <component :is="modalByType[modalType]" />
    </div>
  </div>
</template>

<script>
import { MODAL_TYPES } from '@/core/constants';
import { mapActions, mapState } from 'vuex';
import ModalDesign from './modals/Design.vue';

export default {
  name: 'modal-manager',
  components: {
    ModalDesign,
  },
  computed: {
    ...mapState(['modalType', 'modalOpen']),
    modalByType() {
      return {
        [MODAL_TYPES.DESIGN_CONFIRM]: ModalDesign,
      };
    },
  },
  methods: {
    ...mapActions(['closeModal']),
  },
};
</script>

<style lang="scss">
.modal-manager {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  &__bg {
    position: absolute;
    z-index: 1;
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &__content {
    background: white;
    border-radius: 20px;
    position: relative;
    z-index: 2;
    width: 90%;
    max-width: 400px;
    overflow: hidden;
  }
}
</style>
