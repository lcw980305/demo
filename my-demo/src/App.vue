<template>
  <div class="demo-nomal-table">
    <Button type="primary" @click="openBtnClick"> 添加</Button>
    <Table  ref="selection" :columns="columns" :data="users" width="500px" >
      <template slot="action" slot-scope="{ row }">
        <Button type="primary" class="btn" @click="editBtnClick(row)">
          编辑
        </Button>
        <Button class="btn" @click="onDelete(row)">删除</Button>
      </template>
    </Table>

    <Add
    ref="addModal"
    @addUser="onAdd"
    @editUser="onEdit"></Add>
  </div>
</template>

<script>
import Add from '@/views/userModal.vue'
import * as UserService from '@/api/user.js'
export default {
  name: 'UserTable',
  components: {
    Add
  },
  data () {
    return {

      columns: [
        {
          title: '姓名',
          key: 'name'

        },
        {
          title: '年龄',
          key: 'age'

        },
        {
          title: '性别',
          key: 'sex'

        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'

        }
      ],
      users: []
    }
  },
  methods: {
    onSearch () {},

    onAdd (user) {
      UserService.addUser({
        ...user,
        id: +new Date()
      })
      this.$Message.info('添加成功')
      this.refresh()
    },
    onDelete (row) {
      UserService.deleteUser(row)
      this.$Message.info('删除成功')
      this.refresh()
    },
    onEdit (row) {
      UserService.editUser(row)
      this.$Message.info('修改成功')
      this.refresh()
    },
    editBtnClick (row) {
      this.$refs.addModal.userModalVisible = true
      this.$refs.addModal.modalType = 'edit'
      this.$refs.addModal.form = { ...row }
    },
    openBtnClick () {
      this.$refs.addModal.userModalVisible = true
      this.$refs.addModal.modalType = 'add'
    },
    refresh () {
      this.users = UserService.listUsers()
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
<style></style>
