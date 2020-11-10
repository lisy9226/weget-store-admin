<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script>
import jaJP from "ant-design-vue/lib/locale-provider/ja_JP";
export default {
  name: "app",
  data() {
    return {
      locale: jaJP,
    };
  },
};
</script>
