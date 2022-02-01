<template>
  <div
    class="section pt-box pb-box"
    style="background-color: #ebf5ff; font-family: 'nunito'"
  >
    <div class="header-section q-pb-lg">
      <div class="first-title-white">MARCH1ST?</div>
      <div class="second-title relative-position">
        WHY HACK WITH MARCH<span class="text-secondary">1</span><sup>ST</sup>?
        <div
          class="tiret-wrap relative-position"
          style="margin: auto; width: 298px"
        >
          <div
            class="tiret relative-position"
            style="margin-left: -129px; margin-top: -11px; width: 298px"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="text-center relative-position pb-box"
      style=""
    >
      <q-img src="vectors/log.svg" width="300px" class="gt-xs" />
      <div class="item-block block-1 q-mb-lg">
        <div class="title">OUR PRIOGRAMS ARE NOT CROWDED</div>
        <div class="q-pt-sm">
          March1st is a new platform & we are very selective with the
          researchers we work with
        </div>
      </div>
      <div class="item-block block-2 q-mb-lg">
        <div class="title">
          THE MIDDLE EAST IS STILL AN ACENT MARKET FOR BUG BOUNTIES
        </div>
        <div class="q-pt-sm">
          March1st is a new platform & we are very selective with the
          researchers we work with
        </div>
      </div>
      <div class="item-block block-3 q-mb-lg">
        <div class="title">NO TAXES FORMS</div>
        <div class="q-pt-sm">
          March1st is a new platform & we are very selective with the
          researchers we work with
        </div>
      </div>
      <div class="item-block block-4 q-mb-lg">
        <div class="title">PROTECTION FOR UNSOLICITED</div>
        <div class="q-pt-sm">
          March1st is a new platform & we are very selective with the
          researchers we work with
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.item-block {
  border-left: 2px solid #0676e2;
  padding-left: 15px;
  padding-right: 15px;
  font-family: "nunito";
  font-size: 18px;
  color: #545454;
  max-width: 300px;
  position: absolute;
}
.item-block.block-1,
.item-block.block-2 {
  border-left: none;
  border-right: 2px solid #0676e2;
  text-align: right;
}
.item-block .title {
  font-weight: bolder;
  font-family: "good-time";
  font-size: 17px;
  color: black;
}
.item-block.block-1 {
  top: 0;
  left: 240px;
}
.item-block.block-2 {
  top: 200px;
  left: 120px;
}
.item-block.block-3 {
  top: 0px;
  right: 190px;
  text-align: left;
}
.item-block.block-4 {
  top: 200px;
  right: 190px;
  text-align: left;
}
.text-center{
  margin-top: 30px; 
  margin-bottom: 60px
}

@media (max-width: 599px) {
  .item-block {
    position: relative;
  }
  .item-block.block-1,
  .item-block.block-2 {
    border-right: none;
    text-align: left;
    border-left: 2px solid #0676e2;
  }
  .item-block .title {
    font-size: 15px;
  }
  .item-block.block-1 {
    top: inherit;
    left: 0px;
  }
  .item-block.block-2 {
    top: inherit;
    left: 0px;
  }
  .item-block.block-3 {
    top: inherit;
    left: 0px;
    text-align: left;
  }
  .item-block.block-4 {
    top: inherit;
    right: 0px;
    text-align: left;
  }
  .text-center{
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 0px
  }
  .pb-box{
    padding-bottom: 10px;
  }
}
</style>
