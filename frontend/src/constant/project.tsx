import { INavigationItem, Paths } from "@models"
import { CrossIcon } from "@components/icons";

export const project = {
  name: "self regulator",
};

export const navigationItemsForHomepage: INavigationItem[] = [
  { name: "pricing", path: Paths.PRICING, icon: <CrossIcon width={18} /> },
  { name: "resources", path: Paths.RESOURCES, icon: <CrossIcon width={18} /> },
  { name: "forum", path: Paths.FORUM, icon: <CrossIcon width={18} /> },
  { name: "shop", path: Paths.SHOP, icon: <CrossIcon width={18} /> },
];

export const navigationItemsForAuthenticedUsers: INavigationItem[] = [];

export const ACCESS_TOKEN = "access"
export const REFRESH_TOKEN = "refresh"