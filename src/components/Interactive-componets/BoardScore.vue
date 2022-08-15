<template>
  <div class="board-wrapper">
    <div class="content-wrapper">
      <div class="close-btn"></div>
      <b-form-spinbutton class="board-score" v-model="select" min="0" max="8"></b-form-spinbutton>
    </div>
  </div>
</template>

<script>
import personByData from "@/storage/Worker";

export default {
  props: {
    value: {
      default: 0
    },
    index:{default: 0},
    field: {default:""},
    list:{default:[]},
  },
  methods:{
    updateWorkerHour(value) {
      let date = this.field.date;
      let personId = this.list[this.index].personalId;
      console.log(value)
      personByData.updateWorkerHour({id: personId, date: date, value: value})
    },
  },
  computed: {
    select: {
      get() {
        return this.value
      },
      set(value) {
        console.log(value)
        this.updateWorkerHour(value)
        this.$emit("input", value);
        this.$emit("changeDays",this.index)
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.board-wrapper {
  display: flex;
  justify-content: center;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  position: relative;

  & div {
    line-height: 2;
    border: 1px solid #ced4da !important;
    border-radius: 2px;
  }
}

.close-btn {
  content: "";
  position: absolute;
  right: 0px;
  top: -8px;
  width: 8px;
  height: 8px;
  background-size: cover;
  background-image: url('../../assets/arrow.png');
}

.b-form-spinbutton .btn{
  font-size: 12px !important;
  padding: 0 2px !important;
}
.b-form-spinbutton output > bdi{
  height: auto !important;
  min-width: 20px !important;
  background: red !important;
  color:white !important;
}
.b-form-spinbutton output{
  padding: 0px !important;
}
.disable-weekend{
  pointer-events: none!important;
}

</style>
