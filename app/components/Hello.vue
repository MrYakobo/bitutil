<template>
  <div class="hero  has-text-centered">
  <div class="hero-head">
    <h1 class="title is-1">Bitutil</h1>
  </div>
  <div class="hero-body">
    <div class="box buttons is-centered has-addons">
      <input v-model="hex" type="text" class="input mono has-text-centered" placeholder="hex" maxlength="8">
      <div v-for="(i,c) in revrange(0,32)">
        <template v-if="c%8==0">
          &nbsp;
        </template>
        <button @click="toggleBit(i)" :class="['button ', getBit(i)==0?'is-light':'is-dark']">{{getBit(i)}}</button>
        <div class="label">{{i}}</div>
      </div>
    </div>
    </div>
    <div class="hero-foot">
    <div class="columns">
      <div class="column card">
        <p class="subtitle is-2">Hex</p>
        <span class="mono">{{disp.hex}}</span>
      </div>
      <div class="column card">
        <p class="subtitle is-2">Dec</p>
        <span class="mono">{{disp.dec}}</span>
      </div>
    </div>
    </div>
  </div>
</template>
<style>
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
        val: ZEROS,
        hex: ''
      }
    },
    computed: {
      disp() {
        var int = parseInt(this.val.slice().reverse().join(''), 2)
        return {
          hex: int.toString(16).toUpperCase(),
          dec: int.toString(10)
        }
      }
    },
    watch: {
      hex() {
        if (this.hex != '') {
          var arr = pad(parseInt(this.hex, 16).toString(2), 32).split('').map((b) => parseInt(b)).reverse()
          // this.val = ZEROS.slice(32-arr.length).concat(arr)
          this.val = arr
        } else {
          this.val = ZEROS
        }
      }
    },
    methods: {
      revrange(min, max) {
        var a = []
        for (var i = max - 1; i >= min; i--) {
          a.push(i)
        }
        return a
      },
      toggleBit(i) {
        this.val.splice(i, 1, 1 - this.val[i])
      },
      getBit(i) {
        return this.val[i]
      }
    }
  }
</script>