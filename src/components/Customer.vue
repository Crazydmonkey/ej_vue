<template>
    <div id="customer" style="background:#ffffff">
        <!-- {{this.$store.state.customer.list}} -->
        <el-button class="add_btn" size="small" type="primary" @click="handlerToAdd">添加</el-button>
        <el-button class="batch_delete" size="small" type="danger" @click="batchDelete">批量删除</el-button>
        <el-table
            @selection-change="handleSelectionChange"
            :data="List"
            height="550"
            style="width: 100%;line-height:normal;padding-top:1em">
            <el-table-column
            type="selection"
            width="55"
            prop="id"
            >
            </el-table-column>
            <el-table-column
            label="姓名"
            prop="realname">
            </el-table-column>
            <el-table-column
            label="电话"
            prop="telephone">
            </el-table-column>
                <el-table-column
            label="状态"
            prop="status">
            </el-table-column>
            <el-table-column
            align="right">
        
            <template v-slot="record">
                <el-button
                size="mini"
                @click="handleEdit(record.$index, record.row)">Edit</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(record.$index, record.row)">Delete</el-button>
            </template>
            </el-table-column>
        </el-table>
          <!-- 模态框  -->
        <el-dialog title="添加顾客信息" :visible="visible" @close="handlerClose">
            
            <el-form :model="customer" status-icon   label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" style="display:none" prop="id">
                    <el-input type="password" v-model="customer.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input  v-model="customer.realname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="customer.telephone"></el-input>
                </el-form-item>
                 <el-form-item label="状态" prop="status">
                    <el-input v-model="customer.status"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" size="small" @click="handlerClose">取消</el-button>
                <el-button type="primary" size="small" @click="handlerSummit">确定</el-button>
            </div>
        </el-dialog>       
    </div>
</template>
<script>
import { mapState } from 'vuex';
var vm;
export default {
    data(){
        return {
            name:"顾客管理",
            visible:false,
            customer:{},
            ids:[]
        }
    },
    computed:{
      List(){
          return vm.$store.state.customer.list
      }
    },
    created(){
        console.log(this)
        this.$store.dispatch('customer/findAll')
        vm=this;
    },
    methods:{
        handlerToAdd(){
            this.visible=true;
            this.customer={}
        },
        handlerSummit(){
           this.$store.dispatch('customer/saveOrUpdate',this.customer);
           this.visible=false;
        }
        ,
        handleEdit(index, row) {
            console.log(index, row);
            this.visible=true;
            this.customer={
                id:row.id,
                realname:row.realname,
                telephone:row.telephone,
                status:row.status
            }
        },
        handleDelete(index, row) {
            this.$store.dispatch('customer/deleteCustomer',row.id)
        },
        handlerClose(){
            this.visible=false;
        }, 
        batchDelete(){
            var arr=[];
            this.ids.map((item,index)=>{
                arr.push(item.id);
            })
            this.$store.dispatch('customer/batchDeleteCustomer',arr)
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row.id);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.ids = val;
      }
    },
  
}
</script>
<style scoped>
    .btns{
        display:flex;
    }
    .add_btn{
        margin-top:1.5em;
        margin-left:1.5em;
    }
     .batch_delete{
        margin-top:1.5em;
        margin-left:1.5em;
    }
    .table{
       padding: 1em;
    }
</style>