import type { ReactNode } from "react";
import { Paths } from "@models/paths";

export interface INavigationItem {
  name: string;
  path: Paths;
  icon: ReactNode;
}