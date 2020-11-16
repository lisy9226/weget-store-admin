<template>
  <a-layout-content style="margin: 10px">
    <div class="content-style">
      <a-page-header title="WeGet" />
      <a-divider class="a-divider-style" />
      <!-- 出荷状況・注文状況 -->
      <a-row class="a-row-style" align="middle">
        <a-list :grid="{ gutter: 16, column: 2 }" :data-source="statusInfo">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :title="item.title"
              :headStyle="{ 'font-weight': 'bold' }"
              hoverable
            >
              <!-- 注文状況 -->
              <a-row v-if="item.title === $t('labelMesseges.order')">
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
              <!-- 出荷状況 -->
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
      <!-- 売上情報 -->
      <a-row style="a-row-style" align="middle">
        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="saleInfo">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :title="item.title"
              :headStyle="{ 'font-weight': 'bold' }"
              hoverable
              ><a-statistic
                :title="$t('labelMesseges.sale')"
                :value="item.sales"
                :value-style="{ color: '#cf1322' }"
                prefix="￥"
                style="margin-right: 50px" />
              <a-statistic
                :title="$t('labelMesseges.saleNo')"
                :value="item.salesVolume"
            /></a-card>
          </a-list-item>
        </a-list>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    // 売上情報を取得
    this.getSaleInfo();
    // 注文状況を取得
    this.getOrderInfo();
    // 出荷状況を取得
    this.getShipInfo();
  },
  computed: {
    ...mapState(["authInfo"]),
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
        .get("/sales/summary", {
          distributorId: this.authInfo.userInfo.distributorId,
        })
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
        .get("/order/summary", {
          distributorId: this.authInfo.userInfo.distributorId,
        })
        .then((response) => {
          this.statusInfo[0].orderInfo = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 出荷状況を取得
    async getShipInfo() {
      await this.$axios
        .get("/shipment/summary", {
          distributorId: this.authInfo.userInfo.distributorId,
        })
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