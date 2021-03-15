<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">User Component</div>

                    <div class="card-body">
                            {{listUsers}}

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">email verified </th>
                                <th scope="col">created_at </th>
                                <th scope="col">updated_at </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{{listUsers.id}}</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

    export default {

        computed:{
            ...mapState('user',['listUsers'])

        },
        mounted() {
            this.$store.dispatch('user/getList')            
        }
    }

    
</script>

