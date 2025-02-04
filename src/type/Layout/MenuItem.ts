import type {SubMenuItem} from "@/type/Layout/SubMenuItem.ts";

export interface MenuItem {
    name: string;
    allShow: boolean;
    icon: string;
    path: string;
    children: SubMenuItem[];
}
   