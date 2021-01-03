<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" @load="swiperLoad" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    props:{
      topImages:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        counter: 0,
        imgLength: 0
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      // 判断所有图片加载完毕，只执行一次回调
      swiperLoad() {
        if (++this.counter === this.imgLength) {
          this.$emit('swiperLoad');
        }
      }
    },
    watch:{
      // 获取图片个数
      topImages() {
        this.imgLength = this.topImages.length
      }
    }
  }
</script>

<style scoped>
 .detail-swiper {
   height: 300px;
   overflow: hidden;
 }
</style>
