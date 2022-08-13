<template>
  <div class="header">
    <div class="container">
      <h4>
        <slot name="content-title">Puantaj</slot>
      </h4>
      <span><slot name="content">Puantaj / Puantaj Listesi</slot></span>
    </div>
  </div>
</template>

<style lang="scss">
.header > div {
  display: flex;
  justify-content: space-between;
}
</style>