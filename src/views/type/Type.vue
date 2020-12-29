<template>
  <div class="aaa" ref="aaa">
    <div class="bbb">
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
      <h2>分类</h2>
    </div>
  </div>

</template>

<script>
  import BS from 'better-scroll'
  export default {
    name: "Type",
    data(){
      return{
        bs:null
      }
    },
    mounted() {
      this.bs = new BS(this.$refs.aaa,{})
    }
  }
</script>

<style scoped>
  .aaa{
    height: 300px;
    overflow: hidden;
  }
</style>
