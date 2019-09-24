<template>
    <div id="category" style="background:#ffffff">
        <!-- {{this.$store.state.customer.list}} -->
        <el-button class="add_btn" size="small" type="primary" @click="handlerToAdd">添加</el-button>
        <el-button class="batch_delete" size="small" type="danger" @click="batchDelete">批量删除</el-button>
        <el-table
            @selection-change="handleSelectionChange"
            :data="list"
            v-loading="loading"
            height="550"
            style="width: 100%;line-height:normal;padding-top:1em">
            <el-table-column
            type="selection"
            width="55"
            prop="id"
            >
            </el-table-column>
            <el-table-column
            label="名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="数量"
            prop="num">
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
        <el-dialog title="添加分类信息" :visible="visible" @close="handlerClose">
            <el-form :model="category" status-icon   label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" style="display:none" prop="id">
                    <el-input type="password" v-model="category.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input  v-model="category.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input v-model="category.num"></el-input>
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
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
            name:"分类管理",
            visible:false,
            ids:[]
        }
    },
    created(){
        this.findAllCategory();
    },
    methods:{
        ...mapActions('category',{findAllCategory:'findAll',saveOrUpdateCategory:'saveOrUpdate',batchDeleteCategory:'batchDelete'}),
        ...mapActions('category',['setCategory','deleteCategoryById']),
         handlerToAdd(){
            this.visible=true;
            this.setCategory({})
        },
        handlerSummit(){
           this.visible=false;
           this.saveOrUpdateCategory(this.category)
        }
        ,
        handleEdit(index, row) {
            console.log(index, row);
            this.setCategory(row)
            this.visible=true;
        },
        handleDelete(index, row) {
            this.deleteCategoryById(row.id)
        },  
        handlerClose(){
            this.visible=false;
        }, 
        batchDelete(){
            var arr=[];
            this.ids.map((item,index)=>{
                arr.push(item.id);
            })
           this.batchDeleteCategory(arr);
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
    computed:{
        ...mapState('category',['list','loading','category'])
    }
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