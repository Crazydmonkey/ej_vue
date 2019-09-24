<template>
    <div id="product" style="background:#ffffff">
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
            label="产品名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="产品描述"
            prop="description">
            </el-table-column>
            <el-table-column
            label="价格"
            prop="price">
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
        <el-dialog title="添加产品信息" :visible="visible" @close="handlerClose">
            <el-form :model="product" status-icon   label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" style="display:none" prop="id">
                    <el-input type="password" v-model="product.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="name">
                    <el-input  v-model="product.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品描述" prop="description">
                    <el-input v-model="product.description"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                 <el-form-item label="状态" prop="status">
                    <el-input v-model="product.status"></el-input>
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
import {mapActions,mapState,mapMutations,mapGetters} from 'vuex'
export default {
    data(){
        return {
            name:"产品管理",
            ids:[],
            visible:false
        }
    },
    computed:{
        ...mapState('product',['list','loading','product'])
    },
    created(){
        this.findAllProduct();
    },
    methods:{
        ...mapActions('product',{findAllProduct:'findAll',saveOrUpdateProduct:'saveOrUpdate'}),
        ...mapActions('product',['setProduct','deleteProductById','batchDeleteProduct']),
        handlerToAdd(){
            this.visible=true;
            this.setProduct({})
        },
        handlerSummit(){
           this.visible=false;
           this.saveOrUpdateProduct(this.product)
        },
        handleEdit(index, row) {
           this.setProduct(row);
           this.visible=true;
        },
        handleDelete(index, row) {
            this.deleteProductById(row.id).then((res)=>{
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
            this.batchDeleteProduct(arr);
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