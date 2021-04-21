<template>
    <div >
        <v-card>
            <v-container>
                <v-simple-table >
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    id
                                </th>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-left">
                                    email
                                </th>
                                <th class="text-left">
                                    fecha de creacion
                                </th>
                                <th class="text-left">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="item in listUsers" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.created_at }}</td>
                                <td>
                                    <v-icon 
                                      medium 
                                      color="red"
                                      @click="dialog= true"
                                      >
                                        mdi-pencil

                                    </v-icon>
                                    <v-icon></v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

            </v-container>
      <v-btn
        bottom
        color="blue"
        dark
        fab
        fixed
        right
        @click="dialog = !dialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
            
        </v-card>
  <v-dialog
      v-model="dialog"
      width="800"
  >
        <v-card>
          <v-card-title class="headline grey lighten-2" style="color: #004D40">
            Formulario Editar
          </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="Nombre"
                    v-model="user.name"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="email"
                    v-model="user.email"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                  type="password"
                    label="Password"
                    v-model="user.password"
                  >
                  </v-text-field>
                </v-col>


              </v-row>
              <div>
                  <div  style="text-align:center;color:red;"
                    v-for="(errors, id) in errorMessage" :key="id" v-text="errors"                  
                  >
                  </div>
               </div>
              <pre>{{user}}</pre>
            </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#004D40"
              text
              @click="save"
            >
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
  </v-dialog>



    
    </div>
</template>

<script>
  import { mapState } from 'vuex'

    export default {
      data(){
        return{
          dialog:false,
          user:{
            name:'',
            email:'',
            password:''
          },
          errorMessage:[]
        }
      },

        computed:{
            ...mapState('user',['listUsers','message'])

        },
        methods:{
          save(){
            this.$store.dispatch('user/saveUser',this.user)
            .then(()=>{
              this.$store.dispatch('user/getList')
              this.dialog=false            

            }).catch((e)=>{
                console.log(e.response.data.errors)
                if(e.response.status == 422){
                    this.errorMessage = e.response.data.errors
                }
            })
          }
        },
        mounted() {
            this.$store.dispatch('user/getList')            
        }
    }

    
</script>

