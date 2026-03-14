import { Redirect } from "expo-router";

/**
 * Root index — redirect to main Chats tab.
 */
export default function Index() {
  return <Redirect href="/(tabs)/chats" />;
}
