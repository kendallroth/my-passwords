import { reactive, toRefs } from "vue";

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

interface UseAppSearchProps {
  onChange?: (value: string) => void;
  onClear?: () => string;

  onHide?: () => void;
  onShow?: () => void;
  onToggle?: (shown: boolean) => void;
}

/** Global app search state */
const appSearchState = reactive({
  text: "",
  shown: true,
});

const useAppSearch = (props?: UseAppSearchProps): UseAppSearch => {
  // TODO: Likely support wiping/clearing text when changing routes...

  const clearSearch = () => {
    appSearchState.text = "";
    props?.onClear?.();
  };
  const changeSearch = (input: string) => {
    appSearchState.text = input;
    props?.onChange?.(input);
  };

  const hideSearch = () => {
    appSearchState.shown = false;
    props?.onHide?.();
  };
  const showSearch = () => {
    appSearchState.shown = true;
    props?.onShow?.();
  };
  const toggleSearch = (open: boolean) => {
    appSearchState.shown = open;
    props?.onToggle?.(open);
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
