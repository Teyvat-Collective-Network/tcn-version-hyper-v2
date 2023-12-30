import type { AuthUser } from "@teyvat-collective-network/shared-hyper-v2";

declare global {
    declare namespace App {
        interface Locals {
            token: string?;
            darkMode: boolean;
            user: AuthUser;
        }

        interface PageData {
            token: string?;
            darkMode: boolean;
            user: AuthUser;
        }
    }
}
