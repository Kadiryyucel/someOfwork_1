<template>
  <div class="container">
    <b-button @click.stop="selam" class="excel-btn" variant="outline-secondary">
        <b-icon icon="box-arrow-in-down"></b-icon>
        <span class="excel-title">Excel İndir</span>
    </b-button>
  </div>
</template>

<script>
export default {
  methods:{
    selam(){
      this.$emit("dowloand")
    }
  }
}
</script>

<style lang="scss">
.excel-btn {
  display: flex !important;
  align-items: center !important;
  font-size: 12px !important;
  padding: 4px 12px !important;
  background: #6072E0 !important;
  color: white !important;
  cursor:pointer !important;
}

.excel-title {
  padding-left: 4px;
  font-size: 14px !important;
  line-height: 2;
}

</style>