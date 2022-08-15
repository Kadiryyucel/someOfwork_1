<template>
  <div class="wrapper">
    <div class="container">
      <header-page></header-page>
      <data-table-header :fullDate.sync="fullDate"></data-table-header>
      <data-table-list :fields="fields" :list="items" @changeDay="workingDays"></data-table-list>
      <b-col sm="12">
        <div class="excel-btn-area">
          <excel-btn @dowloand="_dowloand"></excel-btn>
        </div>
      </b-col>
    </div>
  </div>
</template>

<script>
//Component
import DataTableHeader from "@/components/DataTable/DataTableHeader";
import DataTableList from "@/components/DataTable/DataTableList";
import ExcelBtn from "@/components/Interactive-componets/ExcelBtn";
//Page
import HeaderPage from "@/components/Interactive-componets/HeaderPage";
//Storage
import Worker from "@/storage/Worker";
//Plugin
import moment from "moment";
import * as XLSX from "xlsx"

export default {
  components: {HeaderPage, ExcelBtn, DataTableList, DataTableHeader},
  comments: {
    DataTableHeader,
  },
  data() {
    return {
      fields: [
        {
          key: 'user',
          field: 'user',
          label: "Ad Soyad",
          thClass: "user-align"
        },
        {
          key: 'personalId',
          field: 'personalId',
          label: "Personel ID"
        },
        {
          key: "workingHours",
          field: "workingHours",
          label: "Çalıştığı Saat"
        },
        {
          key: "workingDays",
          field: "workingDays",
          label: "Çalıştığı Gün"
        },
        {
          key: "notComeDay",
          field: "notComeDAy",
          label: "Gelmediği Gün"
        }],
      fullDate: [],
      items: [],
      dowloandWorker: [],
      index: 0,
    }
  },
  created() {
    Worker.createPeopleByData()
  },
  methods: {
    changeData(from, to) {
      if (this.fields.length == 13) {
        this.fields = this.fields.splice(0, 5)
      }
      let days = Worker.getDates(from);
      this.fields = [...this.fields, ...this.putKeyToDays(days)];
      this.items = Worker.getWorkers(from, to);
    },
    putKeyToDays(days) {
      let result = days.map((day, i) => {
        return {...day, key: "day" + i}
      });
      return result
    },
    smashDate(dataDate) {
      return dataDate.split("-");
    },
    _dowloand() {
      let dates = this.smashDate(this.fullDate);
      let fromDate = new Date(moment(dates[0], "DD.MM.YYYY").format("MM.DD.YYYY"));
      let to = moment(fromDate).endOf("month").format("DD.MM.YYYY");
      let from = moment(fromDate).startOf("month").format("DD.MM.YYYY")
      let workers = Worker.getWorkers(from, to);
      this.createExcelFile(workers);
    },
    createExcelFile(workers) {
      let fields = this.fields.slice(0, 5)
      let theadTR = "";
      let tbody = "<tbody>";

      theadTR = "<tr>";
      fields.forEach(field => {
        theadTR += "<th>" + field.label + "</th>"
      });
      theadTR += "</tr>";
      const thead = "<thead>" + theadTR + "</thead>";
      workers.forEach(worker => {
        let tr = "<tr>";
        fields.forEach((field) => {
          tr += "<td>" + this.configTable(field, worker) + "</td>"
        });
        tr += "</tr>";
        tbody += tr + "\n";
      });
      tbody += "</tbody>";
      let table = "<table id='table-excel'>" + thead + tbody + "</table>";
      document.body.insertAdjacentHTML('beforeend', table)
      let el = document.getElementById("table-excel")
      var wb = XLSX.utils.table_to_book(el, {sheet: "sheet1"});
      return XLSX.writeFile(wb, "excelMonth.xlsx")
    },
    workingDays(index,value) {
      let currentValue = this.items[index].workingHours = value
      this.items[index].workingDays = (currentValue / 8).toFixed(1);
      this.notComeDays(index);
    },
    notComeDays(index) {
      let currentValue = this.items[index].workingDays
      this.items[index].notComeDay = 8 - currentValue;
    },
    configTable(field, worker) {
      if (field.key == "user") {
        let value = worker[field.key].first + " " + worker[field.key].last
        return value
      }
      let value = worker[field.key]
      return value
    }
  },
  watch: {
    fullDate(newValue) {
      let dates = this.smashDate(newValue);
      this.changeData(dates[0], dates[1])
    },
  }
}
</script>

<style lang="scss">
.wrapper {
  background: #F5F6F8;
  padding: 36px 0;
}

.excel-btn-area > div {
  display: flex;
  justify-content: flex-start;
}

#table-excel {
  display: none;
}
</style>


