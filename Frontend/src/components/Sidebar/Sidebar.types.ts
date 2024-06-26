export interface SidebarItem {
    name: string;
    path: string;
    subItems?: SidebarItem[]; 
}

export interface SidebarProps {
    items: SidebarItem[];
}
