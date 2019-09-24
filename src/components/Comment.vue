<template>
    <div id="address" style="background:#ffffff">
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
            label="内容"
            prop="content">
            </el-table-column>
            <el-table-column
            label="评论时间"
            prop="commentTime">
            </el-table-column>
            <el-table-column
            label="订单号"
            prop="orderId">
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
        <el-dialog title="添加评论信息" :visible="visible" @close="handlerClose">
            <el-form :model="comment" status-icon   label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" style="display:none" prop="id">
                    <el-input type="password" v-model="comment.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input  v-model="comment.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="评论时间" prop="commentTime">
                    <el-input v-model="comment.commentTime"></el-input>
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
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return {
            visible:false,
            ids:[]
        }
    },
    computed:{
        ...mapState('comment',['list','loading','comment'])
    },
    methods:{
        ...mapActions('comment',{findAllComment:'findAll',saveOrUpdateComment:'saveOrUpdate'}),
        ...mapActions('comment',['setComment','deleteCommentById','batchDeleteComment']),
        handlerToAdd(){
            this.visible=true;
            this.setComment({})
        },
        handlerSummit(){
           this.visible=false;
           this.saveOrUpdateComment(this.comment)
        },
        handleEdit(index, row) {
           this.setComment(row)
            this.visible=true;
        },
        handleDelete(index, row) {
            this.deleteCommentById(row.id).then((res)=>{
                this.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
                });
            })
        },  
        handlerClose(){
            this.visible=false;
        }, 
        batchDelete(){
            var arr=[];
            this.ids.map((item,index)=>{
                arr.push(item.id);
            })     
            this.batchDeleteComment(arr);
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
      },
    },
    created() {
       this.findAllComment() 
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
