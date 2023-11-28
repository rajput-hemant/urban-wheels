import { toast } from "@/components/ui/use-toast";

export function currentlyInDeveltopmentToast() {
  toast({
    title: "Currently in development",
    description: "This feature is currently in development.",
  });
}
