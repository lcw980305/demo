<template>
  <div>
    <div class="hello">
      <h1>{{ state.count }}</h1>
      <button @click="addCount">加</button>
    </div>
    <Button type="primary" @click="addclick">+ 新增员工</Button>
    <Table border :columns="columns12" :data="tableData">
      <template slot-scope="{ row }" slot="name">
        <div>{{ row.name }}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="end(row.id)"
          >修改</Button
        >
        <Button type="error" size="small" @click="del(row.id)">删除</Button>
      </template>
    </Table>
    <Add ref="add" :data="tableData" @fn="fn" />
    <End ref="sdd" @fs="fs" />
  </div>
</template>
<script>
import Add from './views/add.vue'
import End from './views/end'
import { reactive, ref } from '@vue/composition-api'
export default {
  setup () {
    const columns12 = [
      {
        title: 'Name',
        slot: 'name'
      },
      {
        title: 'Age',
        key: 'age'
      },
      {
        title: 'Gender',
        key: 'gender'
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center'
      }
    ]
    const state = reactive({
      count: 0
    })
    const addCount = () => {
      state.count++
    }
    const add = ref(null)
    // const addclick = () => {
    //   add.value.dialogVisible = true
    // }
    return { state, addCount, columns12, add }
  },

  name: '',
  components: { Add, End },
  data () {
    return {
      columns12: [
        {
          title: 'Name',
          slot: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Gender',
          key: 'gender'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tableData: JSON.parse(localStorage.getItem('list')) || []
    }
  },
  created () {},
  computed: {},
  methods: {
    // 点击显示新增员工对话框
    addclick () {
      this.$refs.add.dialogVisible = true
    },
    del (row) {
      this.tableData = this.tableData.filter((res) => res.id !== row)
    },
    end (row, index) {
      this.tableData.forEach((res) => {
        // console.log(res)
        if (res.id === row) {
          // console.log(row)
          this.$refs.sdd.form = res
          this.$refs.sdd.dialogVisible = true
        }
      })
    },
    fn (e) {
      this.tableData.push(e)
    },
    fs (e) {
      this.tableData.forEach((res) => {
        // console.log(res, 8989)
        if (res.id === e.id) {
          // console.log(res.id)
          // console.log(e.id)

          res = e
        }
      })
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler () {
        localStorage.setItem('list', JSON.stringify(this.tableData))
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
