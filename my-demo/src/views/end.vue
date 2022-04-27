<template>
  <Modal title="编辑" @on-ok="submit" @on-cancel="closeEvent" v-model="dialogVisible">
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
    val: {}
  },
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        gender: ''
      }
    }
  },
  methods: {
    submit () {
      this.$emit('fs', this.form)
      this.dialogVisible = false
      this.closeEvent()
    },
    closeEvent () {
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
