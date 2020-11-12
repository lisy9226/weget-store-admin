<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <left-menu @replaceContent="replaceContent"/>

    <a-layout>
      <!-- ヘッダーメニュー -->
      <header-menu />
      <!-- 内容 -->
      <div v-if="show">
        <!-- デフォルト：トップページ -->
        <top-page></top-page>
      </div>
      <div v-else>
        <!-- 左メニューに画面を遷移 -->
        <router-view></router-view>
      </div>
      <!-- フッターメニュー -->
      <footer-menu />

    </a-layout>
  </a-layout>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import LeftMenu from "./LeftMenu.vue";
import HeaderMenu from "./HeaderMenu.vue";
import FooterMenu from "./FooterMenu.vue";
import TopPage from "../pages/TopPage.vue";

export default {
  components: {
    LeftMenu,
    HeaderMenu,
    FooterMenu,
    TopPage,
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["isLogin"]),
  },
  methods: {
    replaceContent(){
      this.show = false
    }
  },
};
</script>


