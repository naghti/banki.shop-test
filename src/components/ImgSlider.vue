<template>
  <div class="slider">
    <button class="prev" @click="prev">&#10094;</button>
    <div v-for="i in [currentIndex]" :key="i" class="img">
      <img :src="currentImg" />
    </div>
    <button class="next" @click="next">&#10095;</button>
  </div>
</template>
<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },

  computed: {
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length].src;
    },
  },
};
</script>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  overflow: hidden;
  width: 450px;
  height: 340px;
  display: flex;
  align-items: center;
}
img {
  width: 100%;
}

.prev,
.next {
  width: 25px;
  font-size: 24px;
  cursor: pointer;
}

@media (max-width: 845px) {
  .img {
    width: 350px;
    height: 240px;
  }
}
@media (max-width: 520px) {
  .img {
    width: 250px;
    height: 140px;
  }
  .next {
    width: 15px;
    font-size: 14px;
    cursor: pointer;
  }
}
@media (max-width: 420px) {
  .img {
    width: 200px;
    height: 120px;
  }
}
</style>
