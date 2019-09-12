<template>
  <div>
    <span class="test1" @click="testClick">{{msg}}</span>
    <div class="test"></div>
  </div>
</template>
<<script>
export default {
    data(){
      return{
        msg:"hello,mini-vue-cli"
      }
      
    },
    methods:{
      testClick(){
        console.log(1)
      }
    },
}
</script>
<style lang="scss">
.test1 {
  display:flex;
  color: orange;
  font-size: 30px;
  &:hover {
    color: yellow;
  }
}
</style>