<template>
  <div class="table-score">
    <b-table sticky-header="500px" :fields="fields" :items="items">
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[toCellName(slot)]="props">
        <slot v-bind="props" :name="slot"/>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["fields", "items"],
  methods: {
    toCellName(slot) {
      return `cell(${slot})`
    },
  }
}
</script>

<style lang="scss">
.table-score{
  margin-top:24px;
}
::-webkit-scrollbar {
  display: none;
}
</style>