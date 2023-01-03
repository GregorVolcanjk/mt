<template>
    <v-container class="main-container">
      <h3>Izberi dve drzavi in primerjaj porabo energije</h3>
      <v-row class="v-row">
        <v-col cols="12" sm="6">
          <v-select
            v-model="selected"
            :items="items"
            label="Select"
            multiple
            style="width:200px"></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="selected"
            :items="items"
            label="Select"
            multiple
            style="width:200px"></v-select>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "Compare",
  
    data: () => ({
      ecosystem: [
        {
          text: "vuetify-loader",
          href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
        },
        {
          text: "github",
          href: "https://github.com/vuetifyjs/vuetify/tree/next",
        },
        {
          text: "awesome-vuetify",
          href: "https://github.com/vuetifyjs/awesome-vuetify",
        },
      ],
      importantLinks: [
        {
          text: "Chat",
          href: "https://community.vuetifyjs.com",
        },
        {
          text: "Made with Vuetify",
          href: "https://madewithvuejs.com/vuetify",
        },
        {
          text: "Twitter",
          href: "https://twitter.com/vuetifyjs",
        },
        {
          text: "Articles",
          href: "https://medium.com/vuetify",
        },
      ],
      whatsNext: [
        {
          text: "Explore components",
          href: "https://vuetifyjs.com",
        },
        {
          text: "Roadmap",
          href: "https://vuetifyjs.com/introduction/roadmap/",
        },
        {
          text: "Frequently Asked Questions",
          href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
        },
      ],
    }),
  };
  </script>
  <style>
  .main-container {
    margin-top: 5rem;
  }
  .v-row {
    margin-top: 2rem;
  }
</style>
  