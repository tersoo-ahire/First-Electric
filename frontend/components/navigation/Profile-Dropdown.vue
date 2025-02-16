<template>
<section class="d-flex align-center">
  <v-avatar class="profile__image" size="42">
    <img src="/img/user.png" width="35" height="35" alt="">
  </v-avatar>

  <div v-if="$vuetify.breakpoint.smAndUp" class="font-weight-medium ml-3 mr-1">{{ user.firstName }} {{ user.lastName }}</div>

  <v-menu bottom left offset-y>
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon color="black">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-sheet class="">
      <div @click="logout" class="py-5 px-5 menu__item">
        <div class="d-flex menu__item__inner body-2 text-no-wrap">
          <v-icon size="20" color="grey darken-3" class="mr-4">mdi-logout</v-icon>
          <div class="ml-2">Logout</div>
        </div>
      </div>
    </v-sheet>
  </v-menu>
</section>
</template>

<style lang="scss" scoped>
.profile__image {
  border: 3px solid #F8C422;

  img {
    padding: 7px;
  }
}

.menu__item {
  min-width: 180px;
  cursor: pointer;

  &__inner {
    color: rgb(73, 73, 73);
  }

  &:hover {
    background-color: #F8C422;

    .menu__item__inner {
      color: white;
      font-weight: bold;
    }

    .v-icon {
      color: white !important;
    }
  }
}
</style>

<script>
export default {
  props: ['user'],

  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
