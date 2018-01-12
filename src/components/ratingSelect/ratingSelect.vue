<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active': currentType === 2}" @click="select(2, $event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active': currentType === 0}" @click="select(0, $event)">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{'active': currentType === 1}" @click="select(1, $event)">
        {{desc.negative}}
        <span class="count">{{nagatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':currentContent}" @click="toggleContent">
      <i class="iconfont icon-gou"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default: [],
    },
    selectType: {
      type: Number,
      default: ALL,
    },
    onlyContent: {
      type: Boolean,
      default: true,
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '吐槽',
        };
      },
    },
  },
  data() {
    return {
      currentType: ALL,
      currentContent: true,
    };
  },
  watch: {
    selectType(data) {
      this.currentType = data;
    },
    onlyContent(data) {
      this.currentContent = data;
    },
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => rating.rateType === POSITIVE);
    },
    nagatives() {
      return this.ratings.filter(rating => rating.rateType === NEGATIVE);
    },
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.currentType = type;
      this.$emit('increment', 'selectType', type);
    },
    toggleContent() {
      this.currentContent = !this.currentContent;
      this.$emit('increment', 'onlyContent', this.currentContent);
    },
  },
};
</script>


<style lang="stylus" scoped>
@import './ratingSelect.styl';
</style>
