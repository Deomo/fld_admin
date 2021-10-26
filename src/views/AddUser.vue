<template>
  <div class="addUsers">
    <el-card shadow="never">
      <el-row class="title">
        <el-col :span="10">
          <i class="el-icon-user-solid"></i>
          <span>新增意向客户</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="hover" class="table">
      <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm" label-width="100px" class="demo-ruleForm" status-icon>
        
        <el-row>
          <el-col :span="18" :offset="2">
            <el-form-item label="用户姓名" prop="nickname">
              <el-input v-model.trim="addUserForm.nickname"></el-input>
            </el-form-item>
  
            <el-form-item label="联系方式" prop="contact">
              <el-input v-model.trim="addUserForm.contact"></el-input>
            </el-form-item>

            <el-form-item label="微信" prop="weixin">
              <el-input v-model.trim="addUserForm.weixin"></el-input>
            </el-form-item>

            <el-form-item label="客户所在地" prop="dizhi">
              <el-input v-model="addUserForm.dizhi"></el-input>
            </el-form-item>

            <el-form-item label="客户来源" prop="laiyuan">
              <el-input v-model="addUserForm.laiyuan"></el-input>
            </el-form-item>

            <el-form-item label="客户专员" prop="kefu">
              <el-select v-model="addUserForm.kefu" placeholder="请选择客户专员">
                <el-option :label="item.classname" :value="item.id"
                  v-for="item in kefuList" :key="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="4" >
                  <el-button
                    type="primary"
                    @click="submitForm"
                    style="width:100%;height:50px;">提交</el-button>
                </el-col>
                <el-col :span="3">
                  <el-button
                    @click="resetForm"
                    style="width:100%;height:50px;">重置</el-button>
                </el-col>
              </el-row>
            </el-form-item>


          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getkefuAxios, addUserAxios,} from "../network/network.js";
import { dataCheck } from "../untils/validator.js";
  export default {
    data() {
      return {
        kefuList:[],
        addUserForm: {
          nickname:"",
          contact:"",
          weixin:"",
          dizhi:"",
          laiyuan:"",
          kefu:[],
        },
        addUserRules:{
          nickname:[
            { required: true, message: '请输入客户姓名', trigger: 'blur' }
          ],
          contact:[
            { validator: dataCheck, trigger: 'blur'}
          ],
          laiyuan:[
            { required: true, message: '请输入客户来源' ,trigger: 'blur'}
          ],
          kefu:[
            { required: true, message: '请选择客服专员',trigger: 'blur' }
          ],
          weixin:[
            { validator: dataCheck, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      // 提交表单
      submitForm() {
        this.$refs['addUserForm'].validate((valid) => {
          if (valid) {
            addUserAxios(this.addUserForm).then(res=>{
              if(res.data.code == 200){
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration:'2000'
                });
                this.resetForm();
              }
            })
          } else {
              this.$alert('请按照要求填写', '信息校验失败', {
                confirmButtonText: '确定',
              });
          }
        });
      },
      // 重置
      resetForm() {
        this.$refs['addUserForm'].resetFields();
      }
    },
    mounted() {
      // 获取客服人员
      getkefuAxios().then(res=>{
        this.kefuList = res.data.kefu
      })
    },
  }
</script>

<style lang="less" scoped>
.title{
  font-size: 26px;
  font-weight: bolder;
  color: rgb(23,83,89);
  letter-spacing: 1px;
  i{
    margin-right: 20px;
  }
}
.table {
  margin-top: 20px;
  padding: 30px 0;
  .el-form-item{
    margin-bottom: 50px;
  }
}
</style>