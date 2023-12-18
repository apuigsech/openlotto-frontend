<script setup lang="ts">
import { networkOptions, useDappStore } from '@/stores/useDappStore'

const dappStore = useDappStore()
</script>

<template>
    <v-menu location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props"> {{ dappStore.network}} <v-icon icon="mdi-chevron-down"></v-icon></v-btn>
        </template>
        <v-list>
            <v-list-item v-for="network in networkOptions" :key="network" @click="dappStore.setNetwork(network)">
                <v-list-item-title>{{ network }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<style lang="scss"></style>
