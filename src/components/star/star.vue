<template>
  <div class="star">
    <div class="star-item" :class="starType">
      <span v-for="(item, index) in itemClasses" :key="index" :class="item" class="star-item"></span>
    </div>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },
  computed: {
    starType() {
      return `star-${this.size}`;
    },
    itemClasses() {
      const result = [];
      const score = Math.floor(this.score * 2) / 2;
      const hasDecimal = score % 1 !== 0;
      const integer = Math.floor(score);
      for (let i = 0; i < integer; i += 1) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import 'star.styl';
</style>
