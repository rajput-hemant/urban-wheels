import { toast } from "sonner";

export function currentlyInDeveltopmentToast() {
  toast.info("Currently in development", {
    description: "This feature is currently in development.",
  });
}
