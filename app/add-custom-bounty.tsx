import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddCustomBountyModal } from "@/components/add-custom-bounty-modal";

export default function AddCustomBountyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <AddCustomBountyModal />
  );
}
