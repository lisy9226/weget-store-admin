<template>
  <div>
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="6" style="margin: 0 auto">
        <a-divider>WeGet－ログイン</a-divider>
        <a-alert  type="error" show-icon message="メールまたはパスワードが間違っています" v-if='errorVisable' closable :after-close="onErrorVisable"/>
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
                'userName',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'メールアドレスのフォーマットが正しくありません!',
                    },
                    {
                      required: true,
                      message: 'メールアドレスを入力してください!',
                    },
                  ],
                },
              ]"
              placeholder="メールアドレス"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'パスワードを入力してください!',
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="パスワード"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a class="login-form-forgot" href=""> パスワードを忘れた場合 </a>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              {{ $t("message.login") }}
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
      userName: "",
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
          this.$axios
            .post("/login", {
              userInfo: {
                userName: values.userName,
                userPwd: values.password,
              },
            })
            .then((response) => {
              console.log(response.data);
              if (response.data !== null) {
                this.$store.commit("setUserInfo", {
                  userInfo: {
                    userName: values.userName,
                    userPwd: values.password,
                  },
                });
                this.$router.push({
                  name: "homePage",
                });
              } else {
                this.errorVisable = true
                // alert("请检查密码和账户");
              }
            });
        }
      });
    },

    onErrorVisable(){
      this.errorVisable = false
    },
    // パスワードをリセット
    passwordReset() {},
  },
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>