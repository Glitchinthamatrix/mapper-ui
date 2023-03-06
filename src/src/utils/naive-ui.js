import { h } from "vue";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export function isUploadFileInfo(value) {
  return (
    value.file !== undefined &&
    value.status !== undefined &&
    value.percentage !== undefined
  );
}
export function renderIcon(icon) {
  return () => {
    return h(FontAwesomeIcon, {
      icon,
      size: "sm",
      fixedWidth: true,
    });
  };
}
export function renderRouterLink(to, label) {
  return () =>
    h(
      RouterLink,
      { to: to, class: "outline-none text-md fw-medium" },
      { default: () => label }
    );
}
