import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from '../boot/firebase'
import { showErrorMessage } from '../functions/error-message'

const state = {
    loggedIn: false
};

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    }
};

const actions = {
    registerUser({}, payload) {
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log('success', res)
        })
        .catch(err => {
            Loading.hide();
            showErrorMessage(err.message);
        })
    },
    loginUser({}, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log('success', res)
        })
        .catch(err => {
            Loading.hide();
            showErrorMessage(err.message)
        })
    },
    logoutUser() {
        firebaseAuth.signOut()
    },
    handleAuthStateChange({commit, dispatch}) {
        firebaseAuth.onAuthStateChanged(user => {
            
          if (user) {
            // User is signed in.
            Loading.hide();
            commit('setLoggedIn', true)
            LocalStorage.set('loggedIn', true)
            this.$router.push("/")
            dispatch("tasks/fbReadData", null, { root: true})
                .catch(err => {
                    console.log(err)
                });
          } else {
            commit("tasks/clearTasks", null, {root: true});
            commit("tasks/setTasksDownloaded", false, {root:true})
            commit("setLoggedIn", false)
            LocalStorage.set("loggedIn", false);
            this.$router.replace("/auth")
                .catch(err => {});
          }
        });
    }
};

const getters = {
    
};

export default {
 namespaced: true,
 state,
 mutations,
 actions,
 getters
};