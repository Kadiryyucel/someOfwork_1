<template>
  <div>
    <div class="content-wrapper">
      <div class="close-btn"></div>
      <div class="plus" @click="add">
        <b-icon icon="plus" font-scale="0.75"></b-icon>
      </div>
      <div class="board">{{ boardValue }}</div>
      <div class="minus" @click="minus">
        <b-icon icon="dash" font-scale="0.75"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0
    }
  },

  methods: {
    add() {
      setTimeout(() => {
            if (this.boardValue == 8) return
            this.boardValue += 1;
            console.log(this.boardValue)
            this.$emit("addHour", this.boardValue)
          },
          500)
    },
    minus() {
      setTimeout(() => {
            if (this.boardValue == 0) return
            this.boardValue -= 1;
            console.log(this.boardValue)
            this.$emit("minusHour", this.boardValue)
          },
          500)
    }
  },
  computed: {
    boardValue: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit("input", newVal)
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.board {
  background: #CA444A;
  color:white;
  padding: 0 4px !important;
}

.close-btn{
  content: "";
  position: absolute;
  right:0px;
  top:-8px;
  width: 8px;
  height:8px;
  background-size: cover;
  background-image: url('../assets/arrow.png');
}

</style>
