<template>
  <div class="Projects">
  <v-app id="inspire">
   <v-navigation-drawer
   v-model="drawer"
      app
      class="primary"
      dark
    
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          
        </div>
      </template>
    </v-navigation-drawer>
    
    <v-countainer class="my-5">

      <v-layout row class="mb-6">
        <v-tooltip top>
          <v-btn small flat color="white" @click="sortBy('title')" slot="activator">
          <v-icon left small>mdi-folder</v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
        <span>Sort projects by project name</span>
        </v-tooltip>

        <v-tooltip top>
         <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
           <v-icon left small>mdi-comment-account</v-icon>
          <span class="caption text-lowercase">By person</span>
          </v-btn>
        </v-tooltip>
        <span></span>
      </v-layout>
      
      <v-card flat class="pa-3" v-for="(project, i) in projects" :key="i">
        <v-layout row wrap :class="`pa-3 project ${project.Tittle}`">
          <v-flex xs6 md4>
            <div 
            class="caption grey--text">Houses</div>
              <div >{{project.Houses}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2> 
            <div class="caption grey--text">Region</div>
            <div >{{project.Region}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2> 
            <div class="caption grey--text">Characters</div>
            <div >{{project.Characters}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2> 
            <div class="caption grey--text">Title</div>
            <div >{{project.Title}}</div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      <v-layout row
      align="center"
      justify="space-around"
      >
        <v-flex xs5 md3>
              <v-btn 
              @click="getHouse" 
              color="grey">Houses</v-btn>
        </v-flex>
        <v-flex xs4 md3>
              <v-btn outline block color="grey">Region</v-btn>
        </v-flex>
        <v-flex xs12 md3>
              <v-btn outline block color="grey">Characters</v-btn>
        </v-flex>
        <v-flex xs12 md3>
             <v-btn  outline block color="grey">Title</v-btn>
        </v-flex>
      </v-layout>
    </v-countainer>

           <v-app-bar app dark>
      
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title class="subheading green--text">Projects</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(link,i) in links"
        :key="i"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.path"
      >
        {{ link.label }}
      </v-btn>
      </v-app-bar>

    </v-app>
  </div>
</template>

<script>
export default {
    name: "Vinicius",

  data: () => ({
      houses: [100,200,300],
      projects: [],
     drawer: false,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Team', icon: 'mdi-account-box' },
          { title: 'Projects', icon: 'mdi-gavel' },
        ],
        links: [
    {
      label: "Home",
      path:   "/",
    },
    {
      label: "Projects",
      path: "/Projects",
    },
    {
      label: "Dashboard",
      path:   "/Dashboard"
    },
  ],
  
  }),
  methods:{
    sortBy(prop){
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    async getHouse(){
        Promise.all(this.houses.map((async(h)=> {
           const response = await fetch(
               `https://anapioficeandfire.com/api/houses/${h}`)
               const json = await response.json();
               const H = json.name;
               const R = json.region;
               console.log("alou")
               return {
                 Houses: H,
                 Region: R
               }
        }))).then(v=> this.projects = v)
          //     try {
          //       const response = await fetch(
          //           `https://anapioficeandfire.com/api/houses/${this.projects.Houses}`
          //       );
          //       const json = await response.json();
          //       this.projects.Houses = json.name;
          //       this.Region = json.region;
          //       console.log(this.Houses)
          //     } catch (error) {
          //         console.log("House not found", error)
          //     }

          console.log(this.projects)
           },

          // async getPerson(){
          //     try {
          //       const response = await fetch(
          //           `https://anapioficeandfire.com/api/characters/${this.Person}`
          //       );
          //       const json = await response.json();
          //       this.Characters = json.name;
          //       this.Title = json.titles;

          //     } catch (error) {
          //         console.log("Person not found", error)
          //           console.log(this.title)
          //     }
          // },
     },

       
  }

</script>

<style >

.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid orange;
}

.project.overdue{
  border-left: 4px solid tomato;
}
.project.status{
  border-left: 4px solid green;
}


</style>