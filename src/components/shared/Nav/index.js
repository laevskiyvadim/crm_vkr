import { Logo } from "./Logo";
import { Link } from "./Link";
import { LinkSubLinks } from "./LinkSubLinks";
import { computed, defineComponent, h, ref, toRefs } from "vue";
import { useStore } from "vuex";
import "./style.scss";

export const Nav = defineComponent({
  props: { mainToggle: { type: Function } },

  setup(props) {
    const { mainToggle } = toRefs(props);
    const store = useStore();
    const liActive = ref(false);
    const MenuActive = ref(false);

    const links = computed(() => store.state.links);

    const toggleClass = () => {
      if (MenuActive.value) {
        MenuActive.value = !MenuActive.value;
        liActive.value = !liActive.value;
        mainToggle.value();
      } else {
        liActive.value = !liActive.value;
      }
    };
    const toggleMenu = () => {
      MenuActive.value = !MenuActive.value;
      if (MenuActive.value) liActive.value = false;
      mainToggle.value();
    };

    const p = () => (
      <p class="menu__sub__title">
        Сделано с любовью в России
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M0.0761719 14.98H14.0762V0.98H0.0761719V14.98Z"
            fill="url(#pattern0)"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image0" transform="scale(0.015625)" />
            </pattern>
            <image
              id="image0"
              width="64"
              height="64"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </p>
    );
    const ul = () =>
      h(
        <ul class="nav">
          {links.value.map((link) => {
            return (
              <li class={liCls(link)} key={link.id}>
                {linkOrSubLinks(link)}
              </li>
            );
          })}
        </ul>
      );
    const linkOrSubLinks = (link) =>
      h(
        link.items ? (
          <LinkSubLinks link={link} toggleClass={toggleClass} />
        ) : (
          <Link link={link} />
        )
      );
    const liCls = ({ items }) => {
      return {
        sub__li: items != null ? true : false,
        active: items != null ? liActive.value : null,
      };
    };
    const navCls = ({ value }) => {
      return { menu: true, active: value };
    };
    return () =>
      h(
        <nav class={navCls(MenuActive)}>
          <Logo toggleMenu={toggleMenu} />
          <div class="menu__title">Меню CRM</div>
          {ul()}
          {p()}
        </nav>
      );
  },

  components: { Logo, Link, LinkSubLinks },
});
