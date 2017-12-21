<template>
<!-- @keydown.right="shift(1)" @keydown.left="shift(-1)" @keydown.73="invert" @keydown.68="toggleDarkMode"  -->
  <div :class="['big animation-fast hero has-text-centered', darkMode ? 'dark' : '']">
  <div class="hero-head">
    <button :class="['button absolute animation-fast', darkMode ? 'is-light': 'is-dark' ]" @click="toggleDarkMode">&nbsp;</button>
    <h1 class="title is-1">Bitutil</h1>
  </div>
  <div class="hero-body"> <!-- INPUT -->
    <div class="content" :class="[{faded: bitRecentlySet, dark: darkMode},'animation']">
        <input v-model="hex" type="text" :class="['input mono has-text-centered', bitRecentlySet ? 'thin':'bold', darkMode ? 'dark' : '']" placeholder="hex" :maxlength="amount/4">
        <input v-model="dec" type="number" :class="['input mono has-text-centered', bitRecentlySet ? 'thin':'bold', darkMode ? 'dark' : '']" placeholder="dec">
    </div>
    <div class="content"> <!-- SHIFT/INVERT -->
      <div class="buttons is-centered has-addons">
        <button :class="['button card ', btnClass]" @click="shift(-1)">&lt;&lt;</button>
        <button :class="['button card ', btnClass]" @click="shift(1)">&gt;&gt;</button>
        &nbsp;
        <button :class="['button card ', darkMode ? 'is-dark has-text-success':'is-inverted is-success']" @click="invert()">I</button>
      </div>
    </div>
    <div class="buttons is-centered has-addons"> <!-- BITS -->
      <div v-for="(i,c) in amount">
        <template v-if="c%8==0">
          &nbsp;&nbsp;
        </template>
        <button @click="toggleBit(amount-i)" :class="['button ', bitClass(i)]">{{getBit(amount-i)}}</button>
        <div class="label">{{amount-i}}</div>
      </div>
    </div>
    </div>
    <div class="hero-foot" :class="[{faded: !bitRecentlySet}, 'animation']"> <!-- DISPLAY -->
    <div class="columns">
      <div :class="['column card', {dark: darkMode}]">
        <p class="subtitle is-2">Hex</p>
        <span :class="['mono', bitRecentlySet? 'bold':'thin']">{{disp.hex}}</span>
      </div>
      <div :class="['column card', {dark: darkMode}]">
        <p class="subtitle is-2">Dec</p>
        <span :class="['mono', bitRecentlySet? 'bold':'thin']">{{disp.dec}}</span>
      </div>
    </div>
    </div>
  </div>
</template>
<style>
  input.dark::placeholder{
    color: #555;
  }
  html,body{
    overflow: hidden
  }
  div.big{
    width: 100vw;
    height: 100vh;
    padding-top: 10vh;
    padding-bottom: 10vh;
    position: absolute;
    left: 0;
    top: 0;
  }
  div.dark{
    background-color: #1f1f1f;
  }
  card.dark{
    background-color: inherit
  }

  .input.dark{
      background-color: #1e1e1e;
      border-color: #000;
      border: 1px solid #0000;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  button.absolute{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .animation-fast{
    transition: all .1s;
  }
  .animation{
    transition: all .3s;
  }
  .faded{
      opacity: .4;
  }
  .faded.dark{
      opacity: .65;
  }
  .thin{

  }
  .bold{
    font-weight: bold !important;
    color: #00b9cf;
  }
  h1.title.is-1{
    font-family: 'Lato';
    font-weight: 300;
    font-size: 4rem

  }
  button{
    font-family: 'Source Code Pro' !important
  }
  .mono {
    font-family: 'Source Code Pro';
    width: 200px;
    margin: auto;
    font-size: 1.5em
  }
</style>
<script>
  var ZEROS = new Array(32).fill(0)

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  export default {
    name: 'hello',
    data() {
      return {
        amount: 32,
        val: ZEROS,
        hex: '',
        dec: '',
        bitRecentlySet: false,
        darkMode: false
      }
    },
    mounted(){
      this.darkMode = eval(localStorage.getItem('darkMode'))
    },
    computed: {
      disp() {
        var int = parseInt(this.val.slice().reverse().join(''), 2)
        return {
          hex: int.toString(16).toUpperCase(),
          dec: int.toString(10)
        }
      },
      btnClass(){
          return this.darkMode ? 'is-dark has-text-info':'is-inverted is-info'
      }
    },
    watch: {
      amount(){
        ZEROS = new Array(this.amount).fill(0)
        this.val = ZEROS
      },
      hex() {
        if (this.hex != '') {
          this.dec = ''
          var arr = pad(parseInt(this.hex, 16).toString(2), this.amount).split('').map(b => parseInt(b)).reverse()
          this.val = arr
        } else {
          this.val = ZEROS
        }
        this.bitRecentlySet = false
      },
      dec(){
        if (this.dec != '') {
          this.hex = ''
          var arr = pad(parseInt(this.dec, 10).toString(2), this.amount).split('').map(b => parseInt(b)).reverse()
          this.val = arr
        }
        else{
          this.val = ZEROS
        }
        this.bitRecentlySet = false
      }
    },
    methods: {
      bitClass(i){
        if(this.darkMode){
            return this.getBit(this.amount-i) ? 'is-black has-text-info' : 'is-dark has-text-grey'
        }
        else{
          return ['is-light', 'is-dark'][this.getBit(this.amount-i)]
        }
      },
      shift(d){
        this.val = this.val.map((v,i)=>this.val[i+d]).map(f=> f == null ? 0:f)
        this.bitRecentlySet = !this.val.every(f=>f==0)
      },
      invert(){
        this.val = this.val.map(f=>1-f)
        this.bitRecentlySet = true
      },
      revrange(min, max) {
        var a = []
        for (var i = max - 1; i >= min; i--) {
          a.push(i)
        }
        return a
      },
      toggleBit(i) {
        this.val.splice(i, 1, 1 - this.val[i])
        this.bitRecentlySet = true
      },
      getBit(i) {
        return this.val[i]
      },
      toggleDarkMode(){
        this.darkMode = !this.darkMode
        localStorage.setItem('darkMode', this.darkMode)
      }
    }
  }
</script>