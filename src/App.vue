<template>
  <div class="app">
    <ModalWithSlider
      v-if="modalWindow"
      :modalData="modalData"
      @close="modalWindow = false"
    >
    </ModalWithSlider>
    <HeaderMenu v-model="searchedCard" @search-product="giving"></HeaderMenu>
    <MainWrapper :searchedCard="searchedCard" @show-modal="showModal" />
    <MainFooter />
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import MainWrapper from "@/components/MainWrapper.vue";
import ModalWithSlider from "@/components/ModalWithSlider.vue";
import MainFooter from "@/components/MainFooter.vue";
export default {
  components: { MainFooter, MainWrapper, HeaderMenu, ModalWithSlider },
  data() {
    return {
      searchedCard: "",
      modalWindow: false,
      modalData: {},
    };
  },
  methods: {
    giving(newSearch) {
      this.searchedCard = newSearch;
    },
    showModal(card) {
      this.modalWindow = true;
      this.modalData = card;
    },
  },
  name: "App",
};
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
