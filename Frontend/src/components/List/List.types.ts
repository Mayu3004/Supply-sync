export interface ListProps {
    name: string;
    contact: string;
    points?: number;
    email?:string;
    onUpdate?: () => void;
    onDelete?: () => void;
} 
