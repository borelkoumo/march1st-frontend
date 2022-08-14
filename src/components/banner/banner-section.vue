<template>
  <div
    class="section banner-header"
    style="position: relative"
    id="introduction"
  >
    <div class="absolute-banner">
      <div class="text-banner flex flex-center">
        <div class="text-center">
          <p class="text-banner-1">DO YOU BELIEVE</p>
          <p class="text-banner-2">YOUR SYSTEMS</p>
          <p class="text-banner-3">ARE SECURE?</p>
          <p class="text-banner-4">LETS DO A REALITY CHECK</p>
        </div>
      </div>
    </div>
    <div class="absolute-scroll">
      <div class="scroll-btn flex flex-center">
        <div style="text-align: center">
          <q-img src="vectors/scrool down.svg" width="30px" />
          <div class="text-white q-pt-sm q-pb-md">SCROLL</div>
        </div>
      </div>
    </div>
    <!-- <q-img src="static-banner.png" height="680px" /> -->
    <canvas id="js-canvas" class="scene"></canvas>
  </div>
</template>

<script>
import CelestialBody from "../celestial-body/CelestialBody";

export default {
  created() {},
  mounted() {
    const cb = new CelestialBody();
    cb.animate();
  },
};
</script>

<style scoped>
#introduction {
  height: 100vh;
}
</style>
