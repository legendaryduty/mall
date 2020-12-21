<template>
  <Tabbar>
    <tab-bar-item path="/home">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home-active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/type">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/type.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/type-active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/cart.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/cart-active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile-active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">我的</div>
      </template>
    </tab-bar-item>
  </Tabbar>
</template>

<script>
  import Tabbar from 'components/common/tabbar/Tabbar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabbar",
    components:{
      Tabbar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
