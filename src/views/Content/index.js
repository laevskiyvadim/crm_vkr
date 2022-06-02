import { defineComponent, ref, computed, h } from "vue";
import { useStore } from "vuex";
import { Nav } from "../../components/shared/Nav";
import { Header } from "../../components/shared/Header";
import { CanbanSettings } from "../../components/shared/CanbanSettings";
import Popup22 from "../../components/popups/Popup22.vue";
import "./style.scss";

export const Content = defineComponent({
  components: { Nav, Header, CanbanSettings, Popup22 },
  setup() {
    const store = useStore();
    const { commit, state } = store;
    const mainActive = ref(false);
    const mainCls = () => (mainActive.value ? "active" : "");
    const popup22 = ref(false);

    const toggleMain = () => {
      mainActive.value = !mainActive.value;
    };

    const noMove = () => (popup22.value ? "no-move" : "");
    const popupCondition = computed(() => Object.keys(state.popup).length);
    const closePopup = () => {
      document.querySelector("body").classList.remove("noMove");
      commit("set_popup", {});
    };

    return () =>
      h(
        <div>
          <div class={noMove}>
            <Nav mainToggle={toggleMain} />
            <main class={mainCls()}>
              <Header />
              <div class="canban">
                <CanbanSettings />
                <router-view></router-view>
              </div>
            </main>
            {popupCondition.value ? <Popup22 closePopup={closePopup} /> : ""}
          </div>
        </div>
      );
  },
});
