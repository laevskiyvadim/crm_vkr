import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { h } from "vue";
import { PreLogin } from "../../components/shared/PreLogin";
import "./style.scss";
export const Login = defineComponent({
  components: {
    PreLogin,
  },
  setup() {
    const data = reactive({ email: "", password: "" });
    const store = useStore();
    const router = useRouter();

    const submit = async () => {
      const { dispatch } = store;
      const { push } = router;

      await dispatch("login", data).then(() => {
        push({ name: "Canban" });
      });
    };

    const onChangeInput = (e, name) => {
      data[name] = e.target.value;
    };

    return () =>
      h(
        <div class="form">
          <pre-login></pre-login>
          <div>
            <label for="login">Логин</label>
            <input
              type="text"
              id="login"
              onChange={() => onChangeInput(event, "email")}
            />
          </div>
          <div>
            <label for="pass">Пароль</label>
            <input
              type="password"
              id="pass"
              onChange={() => onChangeInput(event, "password")}
            />
          </div>
          <button onclick={submit}>Логин</button>
        </div>
      );
  },
});
