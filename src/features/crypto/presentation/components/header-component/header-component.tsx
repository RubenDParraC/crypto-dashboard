import { Text, View } from "react-native";

// external components
import { useColorScheme } from "nativewind";

// components
import IconComponent from "../icon-component/icon-components";

/**
 * Header component for the Crypto Dashboard.
 *
 * This component displays the app title and a theme toggle button
 * to switch between light and dark modes. The background, text, and
 * icon colors automatically adjust based on the current color scheme.
 *
 * @behavior
 * - Uses `useColorScheme` from NativeWind to detect and toggle theme.
 * - The toggle button calls `toggleColorScheme` to switch themes.
 * - Header layout is responsive with padding and shadow effects.
 *
 * @example
 * ```tsx
 * <HeaderComponent />
 * ```
 */
export default function HeaderComponent() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View
      className={`w-full h-32 flex items-center justify-between shadow-2xl shadow-slate-700 p-5 pt-12 rounded-b-2xl flex-row ${
        colorScheme === "dark" ? "bg-slate-700" : "bg-white"
      }`}
    >
      {/* App title */}
      <Text
        className={`text-lg font-bold ${
          colorScheme === "dark" ? "text-white" : "text-slate-700"
        }`}
      >
        Crypto Dashboard
      </Text>

      {/* Theme toggle button */}
      <View
        className={`p-2 rounded-full ${
          colorScheme === "dark" ? "bg-white" : "bg-slate-700"
        }`}
      >
        <IconComponent
          icon="AntDesign"
          onClick={toggleColorScheme}
          name={colorScheme === "dark" ? "sun" : "moon"}
          color={colorScheme === "dark" ? "black" : "white"}
        />
      </View>
    </View>
  );
}
