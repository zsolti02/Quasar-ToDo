<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> Harbison Todo
          <!-- <img src="../statics/HarbisonApps.png" alt="" /> -->
        </q-toolbar-title>

        <q-btn v-if="!loggedIn" flat to="/auth" class="absolute-right" icon-right="account_circle" label="login" />
        <q-btn @click="logoutUser" v-else flat class="absolute-right" label="logout" />
      </q-toolbar>
    </q-header>
    <q-footer elevated>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          exact
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="768"
      :width="225"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header>Navagation</q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          exact
          class="text-grey-4"
          clickable
          :to="nav.to"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header> Version {{ appVersion }}</q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: true,
      appVersion: "0.1.0",
      navs: [
        { to: "/", icon: "list", label: "Todo" },
        { to: "/settings", icon: "settings", label: "Settings" },
        { to: "/about", icon: "info", label: "About" }
      ]
    };
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods:{
    ...mapActions('auth', ['logoutUser'])
  }
  
};
//
</script>

// <style></style>
<style lang="scss">
@media screen and (min-width: 769px) {
  .q-footer {
    display: none;
  }
}
.q-drawer,
.q-tabs {
  .q-router-link--exact-active {
    color: $accent !important;
    background: white;
  }
}
.q-tab__indicator {
  visibility: hidden;
}
.strikethrough {
  text-decoration: line-through;
}
</style>
