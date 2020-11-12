<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <div class="logo" />
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
      <a-menu-item key="1" style="margin-top: 0" @click="toTopPage">
        <a-icon type="pie-chart" />
        <span>トップページ</span>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="user" /><span>商品管理</span></span>
        <a-menu-item key="2" @click="toProductsList"> 商品一覧 </a-menu-item>
        <a-menu-item key="3" @click="toProductAdd"> 商品登録 </a-menu-item>
        <a-menu-item key="4" @click="toProductsAdd"> 商品一括登録 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toTopPage() {
      this.$emit("replaceContent", true);
      this.$router.push({
        name: "topPage",
      });
    },
    toProductsList() {
      this.$emit("replaceContent", false);
      this.$router.push({
        name: "productsList",
      });
    },
    toProductAdd() {
      this.$emit("replaceContent", false);
      this.$router.push({
        name: "productAdd",
      });
    },
    toProductsAdd() {
      this.$emit("replaceContent", false);
      this.$router.push({
        name: "productsAdd",
      });
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>