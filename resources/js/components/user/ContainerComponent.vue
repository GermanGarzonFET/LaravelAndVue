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
                                    ultima fecha actualizacion
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
                                <td>{{ item.updated_at }}</td>
                                <td>
                                    <v-icon 
                                      medium 
                                      color="red"
                                      @click="openModal('update',item)"
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
        @click="openModal('insert')"
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
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Nombre"
                    v-model="user.name"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="email"
                    v-model="user.email"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4"
                  v-if="actionForm == 2"
                >
                  <v-select
                    item-text="name"
                    item-value="id"
                    :items="items"
                    label="Cambiar Contraseña?"
                    outlined
                    v-model="chekPassword"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4"
                v-if="actionForm == 1"
                >
                  <v-text-field
                  type="password"
                    label="Password"
                    v-model="user.password"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4"
                v-if="chekPassword == 1"
                >
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
<!--               <pre>{{$data}}</pre>
 -->            </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="actionForm ==1"
              color="#004D40"
              text
              @click="save"
            >
              Guardar
            </v-btn>
            <v-btn v-if="actionForm ==2"
              color="#004D40"
              text
              @click="update"
            >
              Modificar
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
          actionForm:0,
          user:{
            id:0,
            name:'',
            email:'',
            password:''
          },
          errorUser:0,
          errorMessage:[],
          items:[
            {id:1, name:'si'},
            {id:2, name:'no'},
          ],
          chekPassword: 2
        }
      },

        computed:{
            ...mapState('user',['listUsers','message'])

        },
        methods:{
          validate(){
            this.errorUser=0
            this.errorMessage=[]
            if(this.actionForm == 1){
              if(!this.user.name){this.errorMessage.push("Digite el nombre de Usuario")}
              if(!this.user.email){this.errorMessage.push("Digite el nombre de Correo")}
              if(!this.user.password){this.errorMessage.push("Digite la Contraseña")}
              if(this.errorMessage.length){this.errorUser=1}
            }else{
              if(!this.user.name){this.errorMessage.push("Digite el nombre de Usuario")}
              if(!this.user.email){this.errorMessage.push("Digite el nombre de Correo")}
              if(this.chekPassword == 1){
                if(!this.user.password){this.errorMessage.push("Digite la nueva Contraseña")}
              }
              if(this.errorMessage.length){this.errorUser=1}

            }

            return this.errorUser
          },

          clearMessageError(){
              this.chekPassword=2
              this.errorMessage=[]
              this.errorUser=0

          },
          openModal(action, data){
            this.dialog= true
            switch (action) {
              case 'insert':
                    this.user.id=0
                    this.actionForm=1
                    this.user.name=''
                    this.user.email=''
                    this.user.password=''
                    this.clearMessageError()
                  break;
              case 'update':
                    this.actionForm=2
                    this.user.id=data.id
                    this.user.name=data.name
                    this.user.email=data.email
                    this.user.password=data.password
                    this.clearMessageError()
                  break;
            
              default:
                break;
            }


          },

          save(){
            if (this.validate()) {
              return
            }

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
          },

        update(){
          if (this.validate()) {
              return
          }
          this.$store.dispatch('user/updateUser',this.user)
          .then(()=>{
              this.$store.dispatch('user/getList')
              this.dialog=false   
          })



        },



        },
        mounted() {
            this.$store.dispatch('user/getList')            
        }
    }

    
</script>

