import { NavLink } from "react-router-dom";
import { TItem } from "../types/routes.types";
import { TSidebarItem } from "../types/items.types";

export const generateSidebarItems = (items: TItem[], role: string): TSidebarItem[] => {
    const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
        if (item.name && item.path) {
            acc.push({
                key: item.name,
                label: (
                    <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
                ),
            });
        }

        if (item.children) {
            const childrenItems = item.children
                .map((child) => {
                    if (child.name) {
                        return {
                            key: child.name,
                            label: (
                                <NavLink to={`/${role}/${child.path}`}>
                                    {child.name}
                                </NavLink>
                            ),
                        };
                    }
                    return undefined;
                })
                .filter(Boolean); // Filter out undefined values

            acc.push({
                key: item.name!,
                label: item.name,
                children: childrenItems as TSidebarItem[], // Type assertion
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
