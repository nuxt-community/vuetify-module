<template>
  <v-container fill-height>
    <v-row>
      <v-col class="text-center">
        <v-tooltip right>
          <template #activator="{ on }">
            <v-btn
              icon
              large
              href=""
              target="_blank"
              v-on="on"
            >
              <v-icon large>
                mdi-code-tags
              </v-icon>
            </v-btn>
          </template>
          <span>Source</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>
