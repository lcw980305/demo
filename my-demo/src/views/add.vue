<template>
  <Modal
    title="新增员工"
    @on-ok="ok"
    @on-cancel="cancel"
    v-model="dialogVisible"
  >
    <Form ref="form" :model="form" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input v-model="form.name"></Input>
      </FormItem>
      <FormItem label="年龄" prop="age">
        <Input v-model="form.age"></Input>
      </FormItem>
      <FormItem label="性别" prop="gender">
        <Input v-model="form.gender"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  props: {
    data: {}
  },
  setup (props, { emit }) {
    // const dialogVisible = false
    // const form = { name: '', age: '', gender: '' }
    // const ok = () => {
    //   this.dialogVisible = false
    //   emit('fn', form.value)
    //   this.cancel()
    // }
    // const cancel = () => {
    //   this.dialogVisible = false
    //   this.showTree = false
    // }
    // return { dialogVisible, form, ok, cancel }
  },
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        gender: '',
        id: this.data.length + 1
      }
    }
  },
  methods: {
    ok () {
      this.$emit('fn', this.form)
      this.dialogVisible = false
      this.cancel()
    },
    cancel () {
      this.dialogVisible = false
      this.showTree = false

      this.form = {
        name: '',
        age: '',
        gender: ''
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
