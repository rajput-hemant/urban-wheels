import Link from "next/link";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, Settings, User2 } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getUserAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export async function SiteHeader() {
  const user = await getUserAuth();

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-14 items-center space-x-4">
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-1 font-bold">
            <Icons.logo className="size-6" />
            <span>{siteConfig.name}</span>
          </div>
        </Link>

        <div className="flex flex-1 justify-end gap-2">
          {!user ?
            <>
              <RegisterLink
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "hidden sm:flex"
                )}
              >
                Register
              </RegisterLink>

              <LoginLink
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "rounded-full px-6"
                )}
              >
                Login
              </LoginLink>
            </>
          : <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/rajput-hemant.png" />
                  <AvatarFallback>UW</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="bottom" align="end" className="w-56">
                <DropdownMenuLabel className="hover:bg-muted">
                  <p className="truncate">{user.name}</p>
                  <p className="text-muted-foreground truncate text-xs font-normal">
                    {user.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <User2 className="mr-2 size-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LogoutLink>
                    <LogOut className="mr-2 size-4" />
                    Logout
                  </LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </div>
    </header>
  );
}
