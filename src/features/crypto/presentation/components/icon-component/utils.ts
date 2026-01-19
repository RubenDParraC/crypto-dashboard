// external components
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

/**
 * Collection of all supported icon sets.
 *
 * This object maps the icon set names to their corresponding
 * imported icon libraries from `@expo/vector-icons`.
 * It is used internally by the `IconComponent` to render
 * the correct icon from the selected set.
 *
 * Example usage:
 * const Icon = iconSets["AntDesign"];
 */
export const iconSets = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
};

/**
 * Color palette for icons.
 *
 * Maps semantic names to hex color values. This allows consistent
 * color usage across the app and simplifies theme support.
 *
 * Usage example:
 * <IconComponent color="success" />
 */
export const colors = {
  /** Error / negative state (red) */
  error: "#FF0000",

  /** Success / positive state (green) */
  success: "#008F39",

  /** Warning / neutral state (yellow) */
  warning: "#ca8a04",

  /** White color */
  white: "#FFFFFF",

  /** Black color */
  black: "#000000",
};
