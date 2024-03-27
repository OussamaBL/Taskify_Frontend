<template>
   
   <!-- modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <div style="width: 32%;margin: 0 auto;">
                  <div class="form-outline mb-4">
                     <label class="form-label" for="form2Example1">title</label>
                     <input type="text" id="form2Example1" class="form-control" v-model="data.task.title" />
                  </div>
                  <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">priorite</label>
                        <select name="" id="" v-model="data.task.priorite">
                           <option value="low">low</option>
                           <option value="medium">medium</option>
                           <option value="high">high</option>
                        </select>
                        
                  </div>
                  <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">description</label>
                        <input type="text" id="form2Example1" class="form-control" v-model="data.task.description" />
                  </div>
                  <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Start date</label>
                        <input type="date" id="form2Example1" class="form-control" v-model="data.task.start_date" />
                  </div>
                  <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">End date</label>
                        <input type="date" id="form2Example1" class="form-control" v-model="data.task.end_date" />
                  </div>
                  <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Status</label>
                        <select name="" id="" v-model="data.task.status">
                           <option value="a faire">a faire</option>
                           <option value="en cours">en cours</option>
                           <option value="fini">fini</option>
                        </select>
                        
                  </div>
                  <div class="form-outline mb-4">
                     <button v-if="data.action=='add'" type="button" @click="add_task()" class="btn btn-primary btn-block mb-4">Add</button>
                     <button v-if="data.action=='update'" type="button" @click="update_task()" class="btn btn-primary btn-block mb-4">Edit</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <button @click="add()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Task</button>
   
   <table class="table table-striped">
      
      <thead>
         <tr>
            <th>Title</th>
            <th>Priorite</th>
            <th>description</th>
            <th>start date</th>
            <th>end date</th>
            <th>status</th>
            <th></th>
           </tr>
      </thead>
      <tbody>
         <tr v-for="task in data.data_tasks" :key="task.id">
            <th>{{ task.title }}</th>
            <th>{{ task.priorite }}</th>
            <th>{{ task.description }}</th>
            <th>{{ task.start_date }}</th>
            <th>{{ task.end_date }}</th>
            <th>{{ task.status }}</th>
            <th>
               <button @click="edit(task)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
               <button @click="destroy(task.id)" class="btn btn-primary" >Delete</button>
            </th>
         </tr>
      </tbody>
   </table>  
</template>

<script setup>
import { reactive,onMounted } from "vue";
import axios from 'axios';
import Swal from 'sweetalert2';
// import { useAuthStore } from '@/store/auth.js';
// import router from '@/router/index.js';

// const store = useAuthStore();

const data = reactive({
         data_tasks: [],
         action: '',
         task: {
            title:'',
            priorite: '',
            description: '',
            start_date: '',
            end_date: '',
            status: '',
        },
    });

const fetch_data = async () => {
   data.data_tasks=[];
      try {
         
        const response = await axios.get('http://localhost:8000/api/tasks');
        if(response.data.status==200){
          data.data_tasks=response.data.tasks;
        } 
      } catch (error) {
          Swal.fire({
                icon: 'error',
                title: 'tasks...',
                text: error,
              });
      }
};

const edit = (task) => {
      data.action='update';
      data.task.title=task.title;
      data.task.priorite=task.priorite;
      data.task.description=task.description;
      data.task.start_date=task.start_date;
      data.task.end_date=task.end_date;
      data.task.status=task.status;
      data.task.id=task.id;
    }
const add = () => {
      data.action='add';
      data.task.title='';
      data.task.priorite='';
      data.task.description='';
      data.task.start_date='';
      data.task.end_date='';
      data.task.status='';
    
   }

const destroy = async (id) => {
   
          Swal.fire({
            title: 'Confirm Delete',
            text: `Are you sure you want to delete the task`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          })
         .then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete("http://localhost:8000/api/tasks/destroy/"+id)
               .then(response => {
                     fetch_data();
                     Swal.fire({
                        icon: 'success',
                        title: 'tesk deleted',
                        text: response.data.message,
                     });
               })
               .catch(error => {
                           Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'delete failed:' + error,
                           });
               });
            }
         });
      
}

const add_task = async () => {
      try {
         console.log(data.task.status);
        const response = await axios.post('http://localhost:8000/api/tasks',data.task);
        if(response.data.status==200){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'task added',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Sub Category...',
            text: response.data.message,
          });
        }
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Sub Category...',
            text: error,
          });
      }
    }

const update_task = async () => {
      try {
        const response = await axios.put("http://localhost:8000/api/tasks/update/"+data.task.id,data.task);
        if(response.data.status==200){
          fetch_data();
          Swal.fire({
            icon: 'success',
            title: 'Task...',
            text: response.data.message,
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Task...',
            text: response.data.message,
          });
        }
      } 
      catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Task...',
            text: error,
          });
      }
    }

onMounted(fetch_data);
</script>

<style>
</style>