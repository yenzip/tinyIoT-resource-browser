<template>
    <div>
      <ul
        :id="elementId"
        class="vue-simple-context-menu"
        v-click-outside="onClickOutside"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          @click.stop="optionClicked(option)"
          class="vue-simple-context-menu__item"
          :class="[
            option.class,
            option.type === 'divider' ? 'vue-simple-context-menu__divider' : ''
          ]"
          v-bind:style="option.disabled == true ? 'pointer-events:none; color:lightgray' : ''"
        >
          <span v-html="option.name"></span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Vue from "vue";
  import vClickOutside from "v-click-outside";
  Vue.use(vClickOutside);
  
  export default {
    name: "VueSimpleContextMenu",
    props: {
      elementId: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        item: null,
        menuWidth: null,
        menuHeight: null
      };
    },
    methods: {
      showMenu(event, item) { // 우클릭 시 보이는 contextMenu 처리
        this.item = item;
        
        if (item.ty === 5) {  // CSE - CREATE(X), DELETE(X)
          console.log('CSE');
          this.options[0].disabled = true;
          this.options[2].disabled = true;
        }
        else if (item.ty === 2) { // AE - CREATE(O), DELETE(X)
          console.log('AE');
          this.options[0].disabled = false;
          this.options[2].disabled = true;
        }
        else if (item.ty === 3) { // CNT - CREATE(O), DELETE(O)
          console.log('CNT');
          this.options[0].disabled = false;
          this.options[2].disabled = false;
        }
        else if (item.ty === 4) { // CIN - CREATE(X), DELETE(X)
          console.log('CIN');
          this.options[0].disabled = true;
          this.options[2].disabled = true;
        }
        else if (item.ty === 23) {  // SUB - CREATE(X), DELETE(O)
          console.log('SUB');
          this.options[0].disabled = true;
          this.options[2].disabled = false;
        }
  
        var menu = document.getElementById(this.elementId);
        if (!menu) {
          return;
        }
  
        if (!this.menuWidth || !this.menuHeight) {
          menu.style.visibility = "hidden";
          menu.style.display = "block";
          this.menuWidth = menu.offsetWidth;
          this.menuHeight = menu.offsetHeight;
          menu.removeAttribute("style");
        }
  
        if (this.menuWidth + event.pageX >= window.innerWidth) {
          menu.style.left = event.pageX - this.menuWidth + 2 + "px";
        } else {
          menu.style.left = event.pageX - 2 + "px";
        }
  
        if (this.menuHeight + event.pageY >= window.innerHeight) {
          menu.style.top = event.pageY - this.menuHeight + 2 + "px";
        } else {
          menu.style.top = event.pageY - 2 + "px";
        }
  
        menu.classList.add("vue-simple-context-menu--active");
      },
      hideContextMenu() {
        const element = document.getElementById(this.elementId);
        if (element) {
          element.classList.remove("vue-simple-context-menu--active");
          this.$emit("menu-closed");
        }
      },
      onClickOutside() {
        this.hideContextMenu();
      },
      optionClicked(option) {
        this.hideContextMenu();
        this.$emit("option-clicked", {
          item: this.item,
          option: option
        });
      },
      onEscKeyRelease(event) {
        if (event.keyCode === 27) {
          this.hideContextMenu();
        }
      }
    },
    mounted() {
      document.body.addEventListener("keyup", this.onEscKeyRelease);
    },
    beforeDestroy() {
      document.removeEventListener("keyup", this.onEscKeyRelease);
    }
  };
  </script>
  
  <style lang="scss">
  $light-grey: #ecf0f1;
  $grey: darken($light-grey, 15%);
  $blue: #007aff;
  $white: #fff;
  $black: #333;
  
  .vue-simple-context-menu {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    z-index: 1000000;
    background-color: $light-grey;
    border-bottom-width: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    box-shadow: 0 3px 6px 0 rgba($black, 0.2);
    border-radius: 4px;
  
    &--active {
      display: block;
    }
  
    &__item {
      display: flex;
      color: $black;
      cursor: pointer;
      padding: 5px 15px;
      align-items: center;
  
      &:hover {
        background-color: $blue;
        color: $white;
      }
    }
  
    &__divider {
      box-sizing: content-box;
      height: 2px;
      background-color: $grey;
      padding: 4px 0;
      background-clip: content-box;
      pointer-events: none;
    }
  
    // Have to use the element so we can make use of `first-of-type` and
    // `last-of-type`
    li {
      &:first-of-type {
        margin-top: 4px;
      }
  
      &:last-of-type {
        margin-bottom: 4px;
      }
    }
  }
  </style>
  