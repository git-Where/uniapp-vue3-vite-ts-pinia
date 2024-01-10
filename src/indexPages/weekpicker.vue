<template>
  <div>
    <a-popover placement="bottomLeft" trigger="click" v-model="visible">
      <div
        slot="content"
        style="width: 280px; display: inline-block"
        class="unselect"
        @mousedown="(event) => handleMouseDown(event)"
        @mouseup="(event) => handleMouseUp(event)"
      >
        <a-checkable-tag
          class="tag"
          v-for="(item, index) in weekinfo.list"
          :key="index"
          :checked="selectedTags.indexOf(index) > -1"
        >
          <a-tooltip :mouseEnterDelay="1">
            <template slot="title">
              <span>{{ item.start }}到{{ item.end }}</span>
            </template>
            <div
              @mouseover="(event) => handleMouseOver(event, index)"
              @mousedown="(event) => handleMouseDown(event, index)"
            >
              第{{ index + 1 }}周
            </div>
          </a-tooltip>
        </a-checkable-tag>
        <div v-if="type == 'default'">
          <a-checkbox :checked="danchecked" @change="onChangeDan">单周</a-checkbox>
          <a-checkbox :checked="shuangchecked" @change="onChangeShuang">双周</a-checkbox>
          <a-checkbox :checked="allchecked" @change="onChangeAll">全部</a-checkbox>
          <a-button size="small" style="width: 50px" @click="onClear">清空</a-button>
        </div>
      </div>
      <a-input v-model="txtvalue" :readOnly="true"></a-input>
    </a-popover>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: undefined
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      txtvalue: '',
      visible: false,
      selectedTags: [],
      danchecked: false,
      shuangchecked: false,
      allchecked: false,
      mousedown: false,
      weekinfo: {}
    }
  },
  mounted () { },
  computed: {
    start: function () {
      return moment(this.startDate)
    },
    end: function () {
      return moment(this.endDate)
    }
  },
  watch: {
    selectedTags: function (val) {
      var danarr = []
      var shuangarr = []
      var allarr = []
      for (let index = 0; index < this.weekinfo.weeks; index++) {
        if (index % 2 == 0) {
          danarr.push(index)
        }
        if (index % 2 == 1) {
          shuangarr.push(index)
        }
        allarr.push(index)
      }
      if (JSON.stringify(danarr) == JSON.stringify(val)) {
        this.danchecked = true
      } else {
        this.danchecked = false
      }
      if (JSON.stringify(shuangarr) == JSON.stringify(val)) {
        this.shuangchecked = true
      } else {
        this.shuangchecked = false
      }
      if (JSON.stringify(allarr) == JSON.stringify(val)) {
        this.allchecked = true
      } else {
        this.allchecked = false
      }
      const strarr = []
      let s = -1
      let e = -1
      let lx = false
      let ds = false
      for (let index = 0; index < val.length; index++) {
        const one = val[index]
        const two = val[index + 1]
        if (two - one == 1) {
          // 连续
          if (s == -1 && !ds) {
            lx = true
            s = index
          }
          if (lx) continue
        } else if (two - one == 2) {
          // 单双
          if (s == -1 && !lx) {
            ds = true
            s = index
          }
          if (ds) continue
        }

        e = index

        if (s == -1) {
          strarr.push('第' + (val[e] + 1) + '周')
        } else {
          if (lx) {
            lx = false
            strarr.push('第' + (val[s] + 1) + '-' + (val[e] + 1) + '周')
          }
          if (ds) {
            ds = false
            strarr.push('第' + (val[s] + 1) + '-' + (val[e] + 1) + '周' + (val[s] % 2 == 0 ? '(单)' : '(双)'))
          }
          s = -1
        }
      }
      this.txtvalue = strarr.join(',')
    },
    txtvalue: {
      immediate: true,
      handler: function (val) {
        this.SendData()
      }
    },
    value: {
      immediate: true,
      handler: function (val) {
        if (val === '' || val === undefined || val === null) {
          this.selectedTags = []
        } else {
          this.selectedTags = val.weeks.map(value => {
            return value - 1
          })
        }
      }
    },
    startDate: {
      immediate: true,
      handler: function (v, o) {
        if (v !== '') {
          this.weekinfo = this.WeekInfo(this.start, this.end)
          this.SendData()
        }
      }
    }
  },
  methods: {
    onClear () {
      this.selectedTags = []
    },
    handleMouseDown (event, index) {
      if (this.type === 'default') {
        this.mousedown = true
      }
      if (index == undefined) {
        return
      }
      if (this.selectedTags.indexOf(index) == -1) {
        if (this.type === 'default') {
          const nextSelectedTags = [...this.selectedTags, index]
          nextSelectedTags.sort((a, b) => {
            return a - b
          })
          this.selectedTags = nextSelectedTags
        } else {
          this.selectedTags = [index]
        }
      } else {
        this.selectedTags.splice(this.selectedTags.indexOf(index), 1)
      }
    },
    handleMouseOver (event, index) {
      if (this.mousedown) {
        if (this.selectedTags.indexOf(index) == -1) {
          const nextSelectedTags = [...this.selectedTags, index]
          nextSelectedTags.sort((a, b) => {
            return a - b
          })
          this.selectedTags = nextSelectedTags
        }
      }
    },
    handleMouseUp (event, index) {
      this.mousedown = false
    },
    onChangeDan () {
      this.selectedTags = []
      if (!this.danchecked) {
        for (let index = 0; index < this.weekinfo.weeks; index++) {
          if (index % 2 == 0) {
            this.selectedTags.push(index)
          }
        }
      }
    },
    onChangeShuang () {
      this.selectedTags = []
      if (!this.shuangchecked) {
        for (let index = 0; index < this.weekinfo.weeks; index++) {
          if (index % 2 == 1) {
            this.selectedTags.push(index)
          }
        }
      }
    },
    onChangeAll () {
      this.selectedTags = []
      if (this.allchecked == false) {
        for (let index = 0; index < this.weekinfo.weeks; index++) {
          this.selectedTags.push(index)
        }
      }
    },
    WeekInfo: function (start, end) {
      var info = {}
      info.weeks = 0
      info.list = []
      if (start === undefined || start === '') {
        return info
      }
      var s = ''
      while (end >= start) {
        if (s == '') {
          s = moment(start)
        }
        if (start.weekday() == 6 || start.format('YYYY-MM-DD') == end.format('YYYY-MM-DD')) {
          info.weeks += 1
          info.list.push({
            start: s.format('YYYY-MM-DD'),
            end: start.format('YYYY-MM-DD')
          })
          s = ''
        }
        start = start.add(1, 'days')
      }
      this.selectedTags.forEach((v, i) => {
        if (v + 1 > info.weeks) {
          this.selectedTags.splice(i, 1)
        }
      })
      return info
    },
    SendData () {
      const res = {
        weeks: this.selectedTags.map(value => {
          return value + 1
        }),
        text: this.txtvalue,
        weeklist: []
      }
      if (this.weekinfo.list !== undefined && this.weekinfo.list.length > 0) {
        res.weeks.forEach((r, i) => {
          res.weeklist.push(this.weekinfo.list[r - 1])
        })
        if (this.value === undefined || this.txtvalue !== this.value.text || this.value.weeklist.length === 0) {
          this.$emit('input', res)
          this.$emit('change', res, this.txtvalue, this.selectedTags, this.weekinfo)
        }
      }
    }
  }
}
</script>

<style scoped>
.tag {
  border: #ccc 1px solid;
  margin: 2px;
  display: inline-block;
  width: 50px;
}
.unselect {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;

  /* 以下两个属性目前并未支持，写在这里为了减少风险 */
  -o-user-select: none;
  user-select: none;
}
</style>
