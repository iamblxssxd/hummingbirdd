import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";
import { ToastAction } from "@/components/ui/Toast";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to perform this action.",
      variant: "destructive",
      action: (
        <Link href="/sign-in" onClick={() => dismiss()}>
          <ToastAction
            onClick={() => dismiss()}
            altText="Login"
            className="h-9 px-4 py-2 dark:border-white"
          >
            Login
          </ToastAction>
        </Link>
      ),
    });
  };

  return { loginToast };
};
