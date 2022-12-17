import { onMounted, onUnmounted, reactive, toRefs } from "vue";

import type { Ref } from "vue";

interface UseAppSearch {
  clear: () => void;
  change: (value: string) => void;
  /**
   * App search bar is text (reactive)
   *
   * NOTE: Reference can be modified directly by modifying 'text.value', which enables using
   *         the reference as 'v-model' attribute.
   */
  text: Ref<string>;

  hide: () => void;
  show: () => void;
  toggle: (shown: boolean) => void;
  /**
   * Whether search bar is shown (reactive)
   *
   * NOTE: Reference can be modified directly by modifying 'shown.value', which enables using
   *         the reference as 'v-model' attribute.
   */
  shown: Ref<boolean>;
}

type VisibilityAction = "show" | "hide";

interface UseAppSearchProps {
  mountAction?: VisibilityAction;
  unmountAction?: VisibilityAction;
}

/** Global app search state */
const appSearchState = reactive({
  text: "",
  shown: false,
});

const useAppSearch = (props?: UseAppSearchProps): UseAppSearch => {
  const { mountAction, unmountAction } = props ?? {};

  // TODO: Likely support wiping/clearing text when changing routes...

  onMounted(() => {
    if (mountAction !== undefined) {
      toggleSearch(mountAction === "show");
      clearSearch();
    }
  });

  onUnmounted(() => {
    if (unmountAction !== undefined) {
      toggleSearch(unmountAction === "show");
      clearSearch();
    }
  });

  const clearSearch = () => {
    appSearchState.text = "";
  };
  const changeSearch = (input: string) => {
    appSearchState.text = input;
  };

  const hideSearch = () => {
    appSearchState.shown = false;
  };
  const showSearch = () => {
    appSearchState.shown = true;
  };
  const toggleSearch = (open: boolean) => {
    appSearchState.shown = open;
  };

  return {
    clear: clearSearch,
    change: changeSearch,
    hide: hideSearch,
    show: showSearch,
    toggle: toggleSearch,
    ...toRefs(appSearchState),
  };
};

export { useAppSearch };
