<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link color="#15638A" to="/example">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-group
              :prepend-icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              append-icon=""
              color="#15638A"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    Acceso
                  </v-list-item-title>
              </v-list-item-content>
              </template>
               <v-list-item link color="#15638A" to="/user">
                   <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                        Usuarios
                    </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
               <v-list-item link color="#15638A">
                   <v-list-item-action>
                    <v-icon>mdi-account-key</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                        Roles
                    </v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
            </v-list-group>
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>mdi-power</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
 
    <v-app-bar
      app
      color="#004D40"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>
 
    <v-main>
      <v-container>
         <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer
    app
    color="#004D40"
    dark
    >
      <span class="white--text">German Andres Garzon - &copy; 2021</span><br>
      <span class="white--text">german_garzonto@fet.edu.co</span>

    </v-footer>
  </v-app>
</template>
 
<script>
 
export default {
    props: {
        source: String,
    },
 
    data: () => ({
      token: '',
      dialog: false,
      drawer: true,
      model: false,
    }),

    methods:{
      logout(){
        this.$store.dispatch('user/getLogout', this.user);
      }
    },

    created(){
      this.token=localStorage.getItem("blog_token");
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = "Bearer "+this.token 
        this.$store.dispatch('user/getCurrent')

      }else{
          window.location.replace('login')

      }
      
    }


  }
</script>
