import { TouchableOpacity } from "react-native";

// utils
import { colors, iconSets } from "./utils";

// types
import type { IconComponentProps, IconSet, IconComponentType } from "./types";

/**
 * A reusable icon component that supports multiple icon sets.
 *
 * This component wraps any icon from the predefined `iconSets` and allows
 * optional touch interaction. It abstracts icon rendering and provides
 * consistent styling across the app.
 *
 * @typeParam T - The icon set type (e.g., "AntDesign", "FontAwesome").
 *
 * @param icon - The icon set to use, matching one of the keys in `iconSets`.
 * @param name - The name of the icon to display from the selected icon set.
 * @param color - Optional color key, defaults to "black". Maps to `colors` object.
 * @param size - Optional size of the icon in pixels, defaults to 24.
 * @param onClick - Optional callback to handle press events. If provided, the icon
 * is wrapped in a `TouchableOpacity`.
 *
 * @returns A React element rendering the specified icon, optionally clickable.
 *
 * @example
 * ```tsx
 * <IconComponent
 *   icon="AntDesign"
 *   name="caret-up"
 *   color="success"
 *   size={16}
 *   onClick={() => console.log("Icon clicked")}
 * />
 * ```
 */
export default function IconComponent<T extends IconSet>({
  icon,
  name,
  color = "black",
  size = 24,
  onClick,
}: IconComponentProps<T>) {
  const Icon = iconSets[icon] as unknown as IconComponentType<T>;

  return (
    <>
      {onClick ? (
        <TouchableOpacity onPress={onClick}>
          <Icon name={name} size={size} color={colors[color]} />
        </TouchableOpacity>
      ) : (
        <Icon name={name} size={size} color={colors[color]} />
      )}
    </>
  );
}
