import { TCNUser } from "@teyvat-collective-network/shared-hyper-v2";

export function getUserId(obj: TCNUser | string) {
    return typeof obj === "string" ? obj : obj.id;
}
