<template>
  <div class="header">
    <div class="content-wrapper">
        <!-- 头像 -->
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar">
        </div>
        <!-- 内容 -->
        <div class="content">
          <!-- 店名 -->
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <!-- 简介 -->
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <!-- 优惠 -->
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
          <!-- 优惠数量 -->
          <div v-if="seller.supports" class="supports-count" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon iconfont icon-zuoyoujiantou"></i>
          </div>
        </div>
    </div>

    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-zuoyoujiantou"></i>
    </div>

    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>

    <!-- 详情动画弹窗 -->
    <transition name="fade">
      <div class="detail" v-if="detailShow" transition="fade" @click="hideDetail">
        <div class="detail-wrapper clearFix">
          <!-- 主体 -->
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 信息列表标题 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!-- 信息列表 -->
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <!-- 公告标题 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!-- 公告内容 -->
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- 关闭 -->
        <div class="detail-close" @onclick="hideDetail">
          <i class="iconfont icon-cha"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star';

export default {
  components: {
    star,
  },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import 'header.styl';
</style>