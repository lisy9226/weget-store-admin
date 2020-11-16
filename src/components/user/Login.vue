<template>
  <div class="login-style">
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="6" class="a-col-style">
        <a-divider>{{ $t("labelMesseges.titleMsg") }}</a-divider>
        <!-- ログイン失敗場合、エラー内容を表示 -->
        <a-alert
          type="error"
          show-icon
          :message="$t('errorMessages.loginError')"
          v-if="errorVisable"
          closable
          :after-close="onErrorVisable"
        />
        <!-- パスワードリンクが押下された場合、プロンプト情報を表示 -->
        <a-alert
          type="info"
          show-icon
          :message="
            this.infoChoose === 0
              ? $t('infoMessages.mailSend')
              : this.infoChoose === 1
              ? $t('infoMessages.mailRequired')
              : this.infoChoose === 2
              ? $t('infoMessages.mailError')
              : $t('infoMessages.mailExist')
          "
          v-if="infoVisable"
          closable
          :after-close="onInfoVisable"
        />
        <!-- ユーザー情報の入力フォム -->
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="login"
          :span="6"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'mail',
                {
                  rules: [
                    {
                      type: 'email',
                      message: $t('errorMessages.mailError'),
                    },
                    {
                      required: true,
                      message: $t('errorMessages.mailRequired'),
                    },
                  ],
                },
              ]"
              :placeholder="$t('labelMesseges.mail')"
            >
              <a-icon slot="prefix" type="user" class="a-icon-style" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ validator: pwdCheck }],
                },
              ]"
              type="password"
              :placeholder="$t('labelMesseges.password')"
            >
              <a-icon slot="prefix" type="lock" class="a-icon-style" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a class="login-form-forgot" @click="changePwd">
              {{ $t("labelMesseges.passwordForget") }}
            </a>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              {{ $t("labelMesseges.login") }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorVisable: false,
      infoVisable: false,
      infoChoose: 0,
      mail: "",
      password: "",
      form: this.$form.createForm(this, { name: "normal_login" }),
    };
  },
  methods: {
    // ログイン
    login(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // 入力チェックが成功の場合、ログインを行う
          this.$axios
            .post("/login", {
              userInfo: {
                mail: values.mail,
                password: values.password,
              },
            })
            .then((response) => {
              // ログイン成功
              if (response.status === 200) {
                // AuthInfoに設定を行う
                this.$store.commit("setAuthInfo", {
                  authInfo: response.data,
                });

                // ログイン状態に設定を行う
                this.$store.commit("setLoginState", true);

                // HomePageに遷移する
                this.$router.push({
                  name: "homePage",
                });
              }
            })
            .catch(function (error) {
              // ログイン失敗
              if (error.response.status === 400) {
                this.errorVisable = true;
              }
              console.log(error);
            });
        }
      });
    },

    // パスワードをリセット
    changePwd() {
      let mail = this.form.getFieldValue("mail");
      let error = this.form.getFieldError("mail");
      if (mail !== undefined && mail !== "") {
        if (error !== undefined && error !== "") {
          // メールアドレスのフォーマットが正しくありません
          this.infoChoose = 2;
        } else {
          // メールアドレスが正しい
          this.$axios
            .post("/password/reset", this.form.getFieldValue("mail"))
            .then((response) => {
              // 入力したメールに送信を行う
              if (response.status === 200) {
                this.infoChoose = 0;
              }
            })
            .catch(function (error) {
              // メールが存在しない
              if (error.response.status === 400) {
                this.infoChoose = 3;
              }
              console.log(error);
            });
        }
      } else {
        // メールアドレスを入力しない
        this.infoChoose = 1;
      }
      // InfoAlertを表示
      this.infoVisable = true;
    },

    // ErrorAlertを閉じる
    onErrorVisable() {
      this.errorVisable = false;
    },

    // InfoAlertを閉じる
    onInfoVisable() {
      this.infoVisable = false;
    },

    // パスワードチェック
    pwdCheck(rule, value, callback) {
      let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value == undefined || value == "") {
        callback(this.$t("errorMessages.pwdRequired"));
      } else if (!regExp.test(value)) {
        callback(this.$t("errorMessages.pwdCheck"));
      } else {
        callback();
      }
    },
  },
};
</script>