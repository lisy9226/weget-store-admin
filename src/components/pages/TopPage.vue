<template>
  <a-layout-content style="margin: 0px 16px">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-page-header title="WeGet" />
      <a-divider style="margin: 0px" />
      <a-row style="background-color: red; margin: 100px 20%" align="middle">
        <a-col :span="12"> {{ this.text }} </a-col>
      </a-row>
      <a-row style="background-color: red; margin: 100px 20%" align="middle">
        <a-col :span="12"> {{ this.text }} </a-col>
      </a-row>
      <a-row style="background-color: red; margin: 100px 20%" align="middle">
        <a-col :span="12"> {{ this.text }} </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  data() {
    return {
      text: "123",
    };
  },
};
</script>