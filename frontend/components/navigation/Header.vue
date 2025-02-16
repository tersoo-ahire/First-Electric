<template>
<main>
  <v-navigation-drawer width="100%" color="rgba(30, 38, 50, 0.9)" disable-resize-watcher v-model="sideNav.model" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <div style="position: relative">
      <v-icon style="position: absolute; right: 10px; top: 10px;" @click="sideNav.model = false" color="white">mdi-close-circle</v-icon>
    </div>

    <v-sheet tile color="transparent" class="py-3 mt-12 mb-5 d-flex justify-center">
      <nuxt-link to="/">
        <img src="/logo.png" width="190" class="mx-auto">
      </nuxt-link>
    </v-sheet>

    <v-list dark shaped dense>
      <template v-for="item in items">
        <v-list-group color="primary" v-if="item.children" :key="item.text" v-model="item.model" :append-icon="item.model ? 'mdi-chevron-up' : 'mdi-chevron-down'">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ $t(item.text) }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item color="primary" class="ml-6" :to="child.to" v-for="(child, i) in item.children" :key="i" nuxt>
            <v-list-item-action>
              <v-icon>mdi-circle-medium</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ $t(child.text) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else color="primary" nuxt :to="item.to" :key="item.text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ $t(item.text) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <template>
        <v-list-item href="https://app.paygodash.com/firstelec" color="primary">
          <template>
            <v-list-item-action>
              <v-icon>mdi-contactless-payment</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                PAYGO
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar :class="$vuetify.breakpoint.lgAndUp ? 'px-12' : ''" flat color="transparent" height="100%" absolute>
    <div style="width: 100%" class="d-flex justify-space-between align-center pt-10">
      <div style="width: 100%" class="d-flex justify-space-between align-center">
        <v-toolbar-title>
          <nuxt-link to="/">
            <img src="/logo.png" class="logo">
          </nuxt-link>
        </v-toolbar-title>

        <div v-if="this.$vuetify.breakpoint.mdAndDown" class="d-flex align-center">
          <LangNav />

          <v-badge color="red" class="secondary--text mx-4" :content="cart.length ? cart.length : '0'">
            <v-icon @click="$router.push('/shop/cart')" color="white">mdi-cart</v-icon>
          </v-badge>

          <v-app-bar-nav-icon @click.stop="sideNav.model = !sideNav.model" class="primary--text"></v-app-bar-nav-icon>
        </div>
      </div>

      <!-- <v-spacer v-if="$vuetify.breakpoint.lgAndUp" /> -->

      <div class="flex-grow-1 d-flex align-center justify-end" v-if="$vuetify.breakpoint.lgAndUp">
        <v-btn :ripple="false" nuxt to="/" class="mr-1 font-weight-bold body-1" text>{{ $t('header.home') }}</v-btn>

        <v-menu open-on-hover bottom center offset-y>
          <template v-slot:activator="{ on }">
            <v-btn :ripple="false" color="white" class="mr-1 font-weight-bold body-1" text v-on="on">
              <span>{{ $t('header.solutions') }}</span>
              <v-icon color="white">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-sheet class="py-3">
            <nuxt-link to="/power" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.power') }}</nuxt-link>

            <nuxt-link to="/automation" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.automation') }}</nuxt-link>

            <nuxt-link to="/ev-workshop-services" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.ev') }}</nuxt-link>
          </v-sheet>
        </v-menu>

        <v-menu open-on-hover bottom center offset-y>
          <template v-slot:activator="{ on }">
            <v-btn :ripple="false" color="white" class="mr-1 font-weight-bold body-1" text v-on="on">
              <span>{{ $t('header.services') }}</span>
              <v-icon color="white">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-sheet class="py-3">
            <nuxt-link to="/services/#free-solar-power-assessment" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.power_assessment') }}</nuxt-link>

            <nuxt-link to="/services/#energy-audit" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.energy_audit') }}</nuxt-link>

            <nuxt-link to="/services/#solar-equipment-installation" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.equipment_installation') }}</nuxt-link>

            <nuxt-link to="/services/#electric-motor-installation" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.motor_installation') }}</nuxt-link>

            <nuxt-link to="/services/#engineering-consultation" class="py-2 px-5 menu__item d-flex menu__item__inner body-2 font-weight-bold text-no-wrap">{{ $t('header.consultation') }}</nuxt-link>
          </v-sheet>
        </v-menu>

        <v-btn :ripple="false" nuxt to="/referral" class="mr-1 font-weight-bold body-1" text>{{ $t('header.referral') }}</v-btn>
        <v-btn :ripple="false" nuxt to="/contact" class="mr-1 font-weight-bold body-1" text>{{ $t('header.contact') }}</v-btn>
        <v-btn depressed :ripple="false" small min-width="90" height="30" href="https://app.paygodash.com/firstelec" color="primary" class="mr-6 secondary--text shop__btn font-weight-bold font__13">PAYGO</v-btn>
        <v-btn depressed :ripple="false" nuxt small min-width="90" height="30" to="/shop" color="red" class="mr-6 shop__btn font-weight-bold font__13">{{ $t('header.shop') }}</v-btn>

        <LangNav />
      </div>
    </div>
  </v-app-bar>
</main>
</template>

<style lang="scss" scoped>
.v-btn {
  transition: 0.7s;
  color: white !important;
  border-radius: unset !important;

  &--active:before,
  &:hover:before,
  &:focus:before {
    background-color: transparent;
    opacity: 0;
  }

  &--active,
  &:hover,
  &:focus {
    color: #F8C422 !important;
    background-color: transparent;
    opacity: 1;

    .v-icon {
      color: #F8C422 !important;
    }
  }
}

.shop__btn {
  transition: 0.7s;
  color: white !important;
  border-radius: unset !important;

  &--active:before,
  &:hover:before,
  &:focus:before {
    background-color: transparent;
    opacity: 0;
  }

  &--active,
  &:hover,
  &:focus {
    color: white !important;
    background-color: transparent;
    opacity: 1;

    .v-icon {
      color: white !important;
    }
  }
}

.menu__item {
  min-width: 180px;
  cursor: pointer;

  &__inner {
    color: black;
  }

  &:hover {
    background-color: #F8C422;
  }
}

.v-icon {
  color: white !important;
}

.logo {
  width: 220px;

  @media (max-width: 600px) {
    width: 180px;
  }
}
</style>

<script>
import LangNav from '@/components/navigation/Lang-Nav.vue'

import {
  mapState
} from 'vuex'

export default {
  components: {
    LangNav
  },

  data: () => ({
    sideNav: {
      model: false,
      type: 'persistent',
      clipped: false,
      floating: false,
      mini: false,
      stateless: true,
      scrolled: false
    },

    items: [{
        icon: 'mdi-home',
        text: 'header.home',
        to: '/'
      },
      {
        icon: 'mdi-bag-personal',
        text: 'header.solutions',
        model: false,
        children: [{
            text: 'header.power',
            to: '/power'
          },
          {
            text: 'header.automation',
            to: '/automation'
          },
          {
            text: 'header.ev',
            to: '/ev-workshop-services'
          }
        ]
      },
      {
        icon: 'mdi-car',
        text: 'header.services',
        model: false,
        children: [{
            text: 'header.power_assessment',
            to: '/services/#free-solar-power-assessment'
          },
          {
            text: 'header.energy_audit',
            to: '/services/#energy-audit'
          },
          {
            text: 'header.equipment_installation',
            to: '/services/#solar-equipment-installation'
          },
          {
            text: 'header.motor_installation',
            to: '/services/#electric-motor-installation'
          },
          {
            text: 'header.consultation',
            to: '/services/#engineering-consultation'
          }
        ]
      },
      {
        icon: 'mdi-account-multiple-plus',
        text: 'header.referral',
        to: '/referral'
      },
      {
        icon: 'mdi-message-bulleted',
        text: 'header.contact',
        to: '/contact'
      },
      {
        icon: 'mdi-store',
        text: 'header.shop',
        to: '/shop'
      },
    ],
  }),

  computed: {
    ...mapState(['cart'])
  },
}
</script>
