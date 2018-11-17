<template>
<div>
    <div class='page' id="cinemas">
    <app-header title='影院'></app-header>
    <header class="sub-header">
        <span class="city-icon">
            深圳
        </span>
       <input type="text" name="" id=""  placeholder="搜影院">
       <div></div>
    </header>
    </div> 
</div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.sub-header {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
  left: 0;
  top: 44px;
  color: #666;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  .city-icon {
    // flex: 1;
    text-align: center;
    line-height: 44px;
    &::after {
      content: "";
      display: inline-block;
     
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #666;
      transform: translateY(4px);
    }
  }
}
</style>