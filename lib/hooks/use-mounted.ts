import { useSyncExternalStore } from "react";

function subscribe() {
  // No external store to subscribe to — mount status never changes after
  // the initial client render, so this is a no-op unsubscribe.
  return () => {};
}

function getSnapshot() {
  return true; // Always true once running on the client
}

function getServerSnapshot() {
  return false; // Always false during SSR
}

/**
 * Returns true once the component has mounted on the client.
 * Avoids the setState-in-effect pattern flagged by
 * react-hooks/set-state-in-effect, while giving identical behavior
 * to the old useState + useEffect(() => setMounted(true), []) pattern.
 */
export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}