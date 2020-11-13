<template>
  <a-layout-content style="margin: 10px">
    <div :style="{ padding: '10px', background: '#fff', minHeight: '620px' }">
      <a-page-header title="WeGet" />
      <a-divider style="margin: 0px" />
      <a-row style="margin: 10px 5%" align="middle">
        <a-list :grid="{ gutter: 16, column: 2 }" :data-source="statusInfo">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :title="item.title"
              :headStyle="{ 'font-weight': 'bold' }"
              hoverable
            >
              <a-row v-if="item.title === '注文状況'">
                <a-col
                  :span="6"
                  v-for="(itemOrder, index) in statusInfo[0].orderInfo"
                  :key="index"
                >
                  <a-statistic
                    :title="itemOrder.title"
                    :value="itemOrder.no"
                    style="margin-right: 50px"
                  />
                </a-col>
              </a-row>
              <a-row v-else>
                <a-col
                  :span="6"
                  v-for="(itemShip, index) in statusInfo[1].shipInfo"
                  :key="index"
                >
                  <a-statistic :title="itemShip.title" :value="itemShip.no" />
                </a-col>
              </a-row>
            </a-card>
          </a-list-item>
        </a-list>
      </a-row>
      <a-row style="margin: 10px 5%" align="middle">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="saleInfo">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :title="item.title"
              :headStyle="{ 'font-weight': 'bold' }"
              hoverable
              ><a-statistic
                title="売上金額"
                :value="item.sales"
                :value-style="{ color: '#cf1322' }"
                prefix="￥"
                style="margin-right: 50px" />
              <a-statistic title="売上件数" :value="item.salesVolume"
            /></a-card>
          </a-list-item>
        </a-list>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  created() {
    // 売上情報を取得
    this.getSaleInfo();
    // 注文状況を取得
    this.getOrderInfo();
    // 出荷状況を取得
    this.getShipInfo();
  },
  data() {
    return {
      // 売上情報
      saleInfo: [],
      // 注文状況・出荷状況
      statusInfo: [
        {
          title: "注文状況",
          orderInfo: [],
        },
        {
          title: "出荷状況",
          shipInfo: [],
        },
      ],
    };
  },
  methods: {
    // 売上情報を取得
    async getSaleInfo() {
      await this.$axios
        .get("/topPage/sales")
        .then((response) => {
          this.saleInfo = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 注文状況を取得
    async getOrderInfo() {
      await this.$axios
        .get("/topPage/order")
        .then((response) => {
          console.log(response.data);
          this.statusInfo[0].orderInfo = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 出荷状況を取得
    async getShipInfo() {
      await this.$axios
        .get("/topPage/ship")
        .then((response) => {
          this.statusInfo[1].shipInfo = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>