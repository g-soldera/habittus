import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddCustomGigModal } from "@/components/add-custom-gig-modal";

export default function AddCustomGigScreen() {
  const insets = useSafeAreaInsets();

  return (
    <AddCustomGigModal />
  );
}
