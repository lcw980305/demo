<template>
 <div>
   <Modal
        v-model="userModalVisible"
        width:600
       :title="`${modalType === 'add' ? '新增' : '编辑'}人员信息`"
        @on-cancel="onClose()"
        :mask-closable="false"

       >
       <Form :model="form" ref="ruleForm" :label-width="100"  :rules="rules">
        <FormItem  label="姓名" prop="name">
            <Input placeholder="请输入姓名" v-model="form.name"></Input>
        </FormItem>
         <FormItem  label="姓名" prop="name2">
            <Input placeholder="请输入姓名" v-model="form.name2"></Input>
        </FormItem>
        <FormItem label="年龄" prop="age" :label-width="100">
            <InputNumber  :max="100" :min="1" v-model="form.age" />
        </FormItem>
        <FormItem label="性别" prop="sex" :label-width="100"  >
        <RadioGroup v-model="form.sex">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
        </RadioGroup>
        </FormItem>

    </Form>
     <div slot="footer">
        <Button  @click="onClose()"> 取消</Button>
        <Button type="primary" @click="submit('ruleForm')">
          提交
        </Button>
      </div>
    </Modal>

 </div>
</template>
<script>

import * as C from '@/constants/index.js'
export default {
  name: '',
  data () {
    return {
      modalType: 'add',
      userModalVisible: false,
      form: {
        id: 0,
        name: '',
        name2: '',
        age: 1,
        sex: '男'
      },
      rules: {
        name: [
          {
            validator: this.validatorName1,
            required: true,
            type: 'string',
            trigger: 'blur'
          }
        ],
        name2: [
          {
            validator: this.validatorName2,
            type: 'string',
            trigger: 'change'
          }
        ],
        age: [
          {
            required: true,
            type: 'number',
            message: '请输入年龄',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ]
      }

    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    verifyName (name) {
      // eslint-disable-next-line promise/param-names
      return new Promise((reslove) => {
        if (name === '刘超伟') {
          reslove({
            exist: true
          })
        }
        reslove({
          exist: false
        })
      })
    },

    validatorName2 (rule, value, callback) {
      if (!value) {
        return callback()
      }
      this.verifyName(value).then((res) => {
        if (res.exist) {
          callback(new Error('已经存在了'))
        }
        callback()
      })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.modalType === 'add') {
            this.$emit('addUser', this.form)
          } else if (this.modalType === 'edit') {
            this.$emit('editUser', this.form)
          }
          this.onClose()
        }
      })
    },
    onClose () {
      this.userModalVisible = false
      this.$refs.ruleForm.resetFields()
    },
    validatorName1 (rule, value, callback) {
      if (value === '') {
        callback(new Error('名称不能为空'))
        return
      } else if (!C.NAME1_REGEXP.test(value)) {
        callback(new Error('只能包含中文'))

        return
      } else if (value.length > 10) {
        callback(new Error('名称最多输入10个字'))
        return
      }

      callback()
    }
  }

}
</script>
<style lang='less'  scoped>

</style>
