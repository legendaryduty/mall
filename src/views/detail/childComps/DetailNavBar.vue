<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template v-slot:left >
        <div class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      </template>
      <template v-slot:center>
        <div class="titles">
          <div v-for="(item, index) in titles" class="titles-item" :class="{actived: index==currentIndex}" @click="titlesClick(index)">{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods:{
      titlesClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 13px;
  }

  .titles-item {
    flex: 1;
  }

  .actived {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 10px;
  }
</style>
