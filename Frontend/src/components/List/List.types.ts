export interface ListProps {
    name: string;
    contact?: string;
    points?: number;
    email?:string;
    sales?:number;
    onUpdate?: () => void;
    onDelete?: () => void;
} 
