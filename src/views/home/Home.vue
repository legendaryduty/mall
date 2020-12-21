<template>
  <div id="home">
    <div class="home-nav">
      <nav-bar><template v-slot:center>购物街</template></nav-bar>
    </div>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    data(){
      return{
        recommends:[],
        banners:[]
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>
