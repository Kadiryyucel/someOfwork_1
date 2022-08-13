<template>
  <div class="container">
    <b-row>
      <b-col sm="7">
        <b-input-group size="md" class="p-0">
          <b-form-input class="search" placeholder="Arama"></b-form-input>
          <template #prepend>
            <span class="search-btn">
              <b-icon icon="search"></b-icon>
            </span>
          </template>
        </b-input-group>
      </b-col>
      <b-col sm="3">
        <v-date-picker v-model="range">
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
              <b-input-group size="md">
                <b-form-input :value="selectedDate(inputValue)"
                              v-on="inputEvents"
                              class="calender-value py-1">
                </b-form-input>
                <template #append>
                  <span class="calender-btn" disabled variant="outline-secondary">
                    <b-icon icon="calendar"></b-icon>
                  </span>
                </template>
              </b-input-group>
            </div>
          </template>
        </v-date-picker>
      </b-col>
      <b-col sm="2">
        <b-button class="branch-btn w-100" variant="outline-secondary">
          <a>
            <b-icon icon="diagram-2"></b-icon>
            <span class="branch-title">Şube:Tüm Şubeler</span>
          </a>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  data() {
    return {
      range: new Date()
    }
  },
  methods: {
    selectedDate(inputValue) {
      let start = inputValue ? inputValue : null;
      if (start == null) return

      let newStart = this.configStartDate(start)
      let end = this.forwardData(newStart)
      let result = `${start}-${end}`;
      this.$emit('update:fullDate', result)
      return result;

    },
    configStartDate(start) {
      let startMomentFormat = this.getDateByFormat(start)
      let newStartbyFormat = new Date(startMomentFormat);
      return newStartbyFormat
    },
    getDateByFormat(date) {
      return new Date(moment(date, "DD.MM.YYYY"))
    },
    forwardData(start) {
      if (start == null) return
      let endDate = new Date(start.setDate(start.getDate() + 7));
      return moment(endDate).format('DD.MM.YYYY');
    },
  }
}
</script>

<style lang="scss">
.bc-weekend {
  color: red !important;
}

.months {
  vertical-align: middle
}

.search-btn {
  border-radius: 0.375rem 0 0 0.375rem !important;
  border: 1px solid #ced4da !important;
  border-right: 0px !important;
  padding: 6px 12px;
  display: inline-block;
  background: white;
}

.branch-btn {
  font-size: 12px !important;
  padding: 4px 12px !important;
  background: #6072E0 !important;
  color: white !important;
  pointer-events: none !important;
}

.branch-title {
  font-size: 14px !important;
  line-height: 2;
}

.calender-value {
  border-right: 0px !important;
  font-size: 14px !important;
  padding-right: 0px !important;
}

.calender-btn {
  border-radius: 0 0.375rem 0.375rem 0 !important;
  border: 1px solid #ced4da !important;
  border-left: 0px !important;
  font-size: 16px;
  border: 1px solid black;
  display: inline-block;
  padding: 6px 12px;
  background: white;
}

.search {
  border-left: 0px !important;
}
.user-align{
  text-align: left;
  vertical-align: middle;
}
tr{
  background: white !important;
}
.wrap-word {
  white-space: nowrap !important;
  width: 64px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>