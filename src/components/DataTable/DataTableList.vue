<template>
  <div class="container">
    <b-row>
      <b-col sm="12">
        <data-table :fields="fields" :items="items">
          <template v-slot:day0="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day0']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day1="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day1']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day2="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day2']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day3="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day3']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day4="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day4']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day5="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day5']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day6="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day6']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:day7="data">
            <operation-score-board @changeDays="getIndex(data.index)"
                                   v-model="items[data.index]['day7']" :field="data.field" :index="data.index"
                                   :list="items"></operation-score-board>
          </template>
          <template v-slot:user="data">
            <div class="d-flex">
              <ProfileIco></ProfileIco>
              <div class="wrap-word">{{ data.value.first + " " + data.value.last }}</div>
            </div>
          </template>
          <template v-slot:workingHours="data">
            {{ data.value }}
          </template>
        </data-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import DataTable from "@/components/DataTable/DataTableModel";
import ProfileIco from "@/components/Interactive-componets/ProfileIco";
import OperationScoreBoard from "@/components/Interactive-componets/BoardScore"

export default {
  components: {DataTable, ProfileIco, OperationScoreBoard},
  props: {
    list: [],
    fields: []
  },
  data() {
    return {
      index: 0,
      value: 0,
      oldValue: 0
    }
  },
  computed: {
    items() {
      return this.list
    }
  },
  methods: {
    getIndex(i) {
      this.index = i;
      var collection = this.items[i]['day0'] + this.items[i]['day1'] + this.items[i]['day2'] + this.items[i]['day3'] + this.items[i]['day4'] + this.items[i]['day5'] + this.items[i]['day6'] + this.items[i]['day7'];
      this.value = collection;
      this.$emit('changeDay', this.index, this.value)
    },
  },
}
</script>