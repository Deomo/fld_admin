<template>
    <el-dialog title="修改客户信息"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="false"
    width="65%"
    @close="close">
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
              <el-select v-model="addUserForm.kefu" placeholder="未指定客服" disabled>
                {{addUserForm.kefu}}
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="4" >
                  <el-button
                    type="primary"
                    @click="updateForm"
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
    </el-dialog>
</template>

<script>
import { getByIdAxios,updataAxios} from "../network/network.js";
import { dataCheck } from "../untils/validator.js";
  export default {
    data() {
      return {
        dialogFormVisible: false,
        id:"",
        addUserForm: {
          nickname:"",
          contact:"",
          weixin:"",
          dizhi:"",
          laiyuan:"",
          kefu:[]
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
          weixin:[
            { validator: dataCheck, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      // 提交表单
      updateForm() {
        this.$refs['addUserForm'].validate((valid) => {
          if (valid) {
            updataAxios(this.addUserForm).then(res=>{
              if(res.data.code == 200){
                this.$notify({
                  title: '修改成功',
                  type: 'success',
                  duration:'2000'
                });
                this.resetForm();
                this.dialogFormVisible = false;
                this.$parent.getAllUsers();
              // })
              } else {
                this.$alert('请按照要求填写', '信息校验失败', {
                  confirmButtonText: '确定',
                });
              }
            });
          }
        })
      },
      // 重置
      resetForm() {
        //重置就是重新获取一次数据
        this.getUserInfo(this.id);
      },
      // 获取用户数据
      getUserInfo(id){
        getByIdAxios(id).then(res=>{
          // 先清空一下表单再压入数据
          this.$refs['addUserForm'].resetFields();
          res.data.results.kefu = res.data.results.kefu.split("");
          this.addUserForm = res.data.results;
          let userRes = JSON.stringify(res.data.results);
          window.sessionStorage.setItem("userRes",userRes);
        })
      },
      // 关闭dialog时清空sessionstorage
      close(){
        window.sessionStorage.removeItem("u")
      }
    },
    mounted() {
      // 进入页面，若存在缓存，先清空
      let userRes = window.sessionStorage.getItem("userRes");
      if(userRes){
        window.sessionStorage.removeItem("userRes");
      }
    },
    watch: {
      // 监听id变化，获取用户数据
      id:function(newid){
        this.getUserInfo(newid)
      }
    }
  }
</script>

<style lang="less" scoped>

</style>