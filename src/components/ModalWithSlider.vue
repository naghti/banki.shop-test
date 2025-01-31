<template>
  <div class="modal">
    <div class="window">
      <button @click="$emit('close')" class="close">
        <img src="@/assets/icons/close.png" alt="" class="imgClose" />
      </button>
      <h2 class="name">
        {{ modalData.name }}
      </h2>
      <div class="body">
        <img-slider :images="modalData['img-slider']"></img-slider>
        <div class="description">
          <h4>
            {{ modalData.description }}
          </h4>
          <h3 v-if="modalData.price">Цена: {{ modalData.price }}$</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgSlider from "./ImgSlider.vue";
export default {
  components: {
    "img-slider": imgSlider,
  },
  props: {
    modalData: Object,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.modal {
  position: fixed;
  overflow: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(33, 24, 15, 0.63);
  display: flex;
  align-items: center;
  justify-content: center;

  .window {
    z-index: 999;
    color: #f4f6f9;
    background: #403432;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    position: relative;

    .name {
      padding: 25px;
    }
    .body {
      padding: 20px 20px 45px 20px;
      display: flex;
      align-items: center;

      .description {
        padding: 20px;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
    }
  }
}
@media (max-width: 845px) {
  .modal {
    .window {
      max-width: 500px;

      .body {
        padding: 20px;
        flex-direction: column;

        .description {
          text-align: center;
        }
      }
    }
  }
}
@media (max-width: 520px) {
  .modal {
    .window {
      max-width: 400px;
    }
  }
}
@media (max-width: 420px) {
  .modal {
    .window {
      max-width: 300px;
    }
  }
}
</style>
