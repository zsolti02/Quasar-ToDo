<template>
    <form @submit.prevent="submitRegister">
        <q-banner class="bg-grey-3">
            <template v-slot:avatar>
                <q-icon name="account_circle" color="primary" />
            </template>
            {{tab | titleCase}} to access your todo list from anywhere.
        </q-banner>
        <q-input class="q-mt-sm" label="email"
        v-model="formData.email" 
        lazy-rules ref="email"
        :rules="[ val => isVaildEmail(val) || 'Please enter a vaild email']"></q-input>
        
        <q-input class="q-mt-sm" type="password" label="password"
            v-model="formData.password"
            lazy-rules ref="password"
            :rules="[ val => val.length >= 6 || 'A min. of 6 characters is required']"></q-input>
        <div class=" row q-mt-sm">
            <q-space/>
            <!-- <q-btn flat label="cancel" color="red"/> -->
            <q-btn rounded type="submit" :label="tab" color="green"/>
        </div>
    </form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: ['tab'],
    data() {
        return {
            formData: {
                email: '',
                password:'',
            }
        }
    },
    methods: {
        ...mapActions('auth', ['registerUser', 'loginUser']),

        isVaildEmail(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        submitRegister() {
             this.$refs.email.validate()
             this.$refs.password.validate()
             if(!this.$refs.email.hasError && !this.$refs.password.hasError) {
                 if (this.tab =='login') {
                     this.loginUser(this.formData)
                 }
                 else {
                     this.registerUser(this.formData)
                 }
                 
             }
        }
    },
    filters: {
        titleCase(value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>