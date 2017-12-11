<template>
  <div id="app">
    <div> 
        <div>
           
          
          <button class="button" v-if="!creating" @click="poemify()">+POEMIFY</button>
          <template v-else>
           <textarea class="texty" v-model="message"></textarea>
            <vue-markdown :source="message" ></vue-markdown>
          
            <div>
          <button class="button" @click="addItem()">CREATE YO SELF</button>
          </div>
          </template>
       
        </div>
        <div class="card-grid">
          
  

          <todo-item v-for="(todo, index) in todos" :key="index" :todo="todo" @save="saveItems()" @delete="deleteItem(index)"/>
        </div>
    </div>
  </div>
</template>
<style>
body {
  padding: 2px 2px;
  margin: 2px 2px;
  background: #dedede;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.texty {
  width: 45%;
  height: 200px;
  margin: 7.5px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>
<script>
import TodoItem from "./components/TodoItem.vue";
import VueEditor from 'vue-md-editor';
import Vue from 'vue';

let initialTodos = [
  {
    text:
      "My Ode to my country\n\nThis land, not mine\none I can’t claim but also can’t deny\n\ngluttony, processed food and hatred\nproducts of this country, to name a few\nmade in the U.S.A\n\nmy country tis of thee\nhowever not my sweet land of liberty\nnot my kind of empathy\nnot my dreams of being free\nand not where I can reap the opportunities\nthis country once promised me\n\nbut I have faith\nand can only wait \nand pray that one day we shall get over these\n\nWe still have more to go\nand until then I’ll stay by your side\nas we actually make America great again\nuntil we let go of our armors and our pride\n\nI won’t desert you just because I’m not on the winning side\n\nsomeone once told me,\n“if trump gets elected, I’m moving Canada”\n\nso easy for you to say\njust pack up all your stuff\nand move away \nmove to another country\npressing pause and play\nand bam, you’re in the best world again\n\nso easy for you to play this game\nbut when others come to this country,\nyou pull out your patriotism\n\nyou claim, \nBUILD THE WALL\nCRIMINALS\nRAPIST\nDRUGLORDS\n\nthe same old tricks\nyou used back in the old days\nplotting every way to make your gains\nthrough others’ pains\n\nyou leave this country \nbecause of the mess\nthis evil\nthis capitalism\nbut what you just ordered clothes from H&M and I don’t know what more capitalistic than online shopping\nthis hatred\nthis problematic state\nthis society that is all about the patriarchy\n\nand this hurts because you’re a male\nyou cry out yelling\n\nhow you feel discriminated\nhow you feel the pressure\nhow you feel judged \nfor what you wear\nand how you speak\n\nall while I try to tell you about women issues caused by THE SAME DAMN PATRIARCHY\n\nthere is no need to talk over me\nno need to make this a race\nthis is not a competition\n\nreally\nyou’re telling me what my priorities are supposed to be? For this society?\nseriously\n\ntoo easy to look at just yourself\nyour problems\nyour needs\n\nnow, if you’re a baby, I’d understand\nbut you\nyou’re a grown-ass man\n\nif you’re ‘man-enough’ to waggle your dick around\nlearn how to ‘man-enough’ your brain\nstop thinking with your dick and use that thing that’s in your head\n\nNo, I can’t leave\nI won’t leave \nI just go here\n\nThis is my home\nHome of the free\nI’ll fight for it\nI won’t back down\nthis is my country that I love\n\nleave and don’t come back\nfor if you do, I’ll be the one yelling: GO AWAY. THIS IS MY COUNTRY.\n"
  },
  {
    text:
      "Body of water\n\nI cannot live without my omma\nHow could she go about her life not seeing hers\nYears go by without seeing\nSeparated by water\nI don’t know\nThe truth is\nShe can’t\nIt’s eaten her up\n"
  },
  {
    text:
      "Someone’s daughter\n\nI finally see my mom for more than my mom\nShe’s a daughter too \nAnd a sister\nI forgot she has an omma too\nImprinted in my mind, I auditioned and casted her for only one role in her film\nRole: mom\n\nLike I am her daughter, my mom is someone else’s\nShe’s part of a family\nBack in Korea\nWhere all her loved ones are, except for my sister and me\nAnd where she left them all, except for my sister and me\n\nShe laid down everything\nHer security\nHer education\nHer history\n\nFor she had a family\nA job to do\nA role to assume, for my sister and me\n\nThe more I think about it,\nThe more I feel guilty\nBurden\nI took her away\nSo there could be a chance for me to live\nTo be the star of her film, for me\n"
  },
  {
    text:
      "My country tis of thee\n\nMy country tis of thee\nSweet land they promised me\nOh, I believed\nLand of insecurities\nLand of fallacies\nWrongly they portrayed of me\nLet me be free\n"
  },
  {
    text:
      "A Benjamin Button\n\nI saw my mom become a child\nAs she went in to hug my grandma\nher omma, for the first time in years\n\nLast resort finally called us\nto come back to her motherland\nA painful one\nA dying one\n\nMy mom called for her omma \nlike how five-year-old me would\ncrying as I ran towards her with open arms\nreaching out as far as I can to grasp all of her\nScared\nAlone "
  },
  {
    text:
      "Me against a cup of tea\n\nThey say I pick too many fights. \nBe smart and choose the right ones. \nSo I laugh it off. I play it cool. \nI do this for you.  \n\nGo along the jokes\nas I sip tea from a cute little china teacup\nwith my pinky up. \n\nMy tongue,\nscalding from the hot water. \n\nAt least this way, \nI’ll burn my words and hold my silence. \n\nI seal my lips so nothing can escape. \n\t\n\tThoughts. Emotions.\n\tThe Truth. \n\tFor you, I do this.\n\nBeat myself up. \nShut myself out.\n\nI was taught the right fight was to fight against myself.\nTrue me vs. \nthe me that they want to see.\n"
  }
];
let storeTodos = localStorage.getItem("todos");
if (storeTodos) {
  initialTodos = JSON.parse(storeTodos);
}

export default {
  name: "app",
  components: {
    TodoItem,
     VueEditor
  },
  data() {
    return {
      creating: false,
      message: "",
      status: true,
      todos: initialTodos,
      source: new Date().toLocaleTimeString(),
    };
  },
  methods: {
    poemify() {
      this.creating = true;
    },
    addItem() {
      if (this.message.length > 0) {
        this.todos.unshift({ text: this.message });
        this.message = "";
        this.saveItems();
      }
      this.creating = false;
    },
    deleteItem(index) {
      console.log("gterfd");
      this.todos.splice(index, 1);
      this.saveItems();
    },
    saveItems() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  },
  mounted () {
    setInterval(() => {
      this.source = new Date().toLocaleTimeString();
    }, 1000);
  }

};



</script>
