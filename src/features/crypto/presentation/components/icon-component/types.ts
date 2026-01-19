import type { GestureResponderEvent } from "react-native";

// external components
import type {
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

// types
import type { colors } from "./utils";

/**
 * Defines the available icon sets supported by the app.
 */
export type IconSet =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

/**
 * Maps each icon set to the keys (names) of its available icons.
 *
 * Example:
 * IconNames["AntDesign"] will be the union of all icon names in AntDesign.
 */
export type IconNames = {
  AntDesign: keyof typeof AntDesign.glyphMap;
  Entypo: keyof typeof Entypo.glyphMap;
  EvilIcons: keyof typeof EvilIcons.glyphMap;
  Feather: keyof typeof Feather.glyphMap;
  FontAwesome: keyof typeof FontAwesome.glyphMap;
  Fontisto: keyof typeof Fontisto.glyphMap;
  Foundation: keyof typeof Foundation.glyphMap;
  Ionicons: keyof typeof Ionicons.glyphMap;
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap;
  MaterialIcons: keyof typeof MaterialIcons.glyphMap;
  Octicons: keyof typeof Octicons.glyphMap;
  SimpleLineIcons: keyof typeof SimpleLineIcons.glyphMap;
  Zocial: keyof typeof Zocial.glyphMap;
};

/**
 * Common props for a single icon.
 *
 * @typeParam T - The icon set type (e.g., "AntDesign", "FontAwesome").
 */
export type IconProps<T extends IconSet> = {
  /** The name of the icon to display from the selected icon set */
  name: IconNames[T];

  /** Optional size of the icon in pixels (default handled by component) */
  size?: number;

  /** Optional color key, maps to `colors` object */
  color?: keyof typeof colors;

  /** Optional callback for press events */
  onClick?: (event: GestureResponderEvent) => void;
};

/**
 * Props for the `IconComponent`, extending basic icon props.
 *
 * Adds the `icon` prop to select which icon set to use.
 */
export type IconComponentProps<T extends IconSet> = {
  /** The icon set to use */
  icon: T;
} & IconProps<T>;

/**
 * The React component type for a specific icon set.
 *
 * This is used internally to type-cast icons from different sets
 * to a consistent component interface.
 */
export type IconComponentType<T extends IconSet> = React.ComponentType<{
  /** The icon name for the set T */
  name: IconNames[T];

  /** Icon size in pixels */
  size: number;

  /** Icon color as a string */
  color: string;
}>;
