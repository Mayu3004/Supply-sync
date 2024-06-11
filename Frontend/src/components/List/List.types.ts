export interface ListProps {
    name: string;
    contact: string;
    sales?: number;
    onUpdate?: () => void;
    onDelete?: () => void;
} 
