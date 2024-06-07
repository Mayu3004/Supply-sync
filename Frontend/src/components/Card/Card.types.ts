export interface CardProps {
    title: string;
    description: string;
    price?: number;
    photoUrl?: string;
    quantity?: number;
    points?: number;
    onUpdate?: () => void;
    onDelete?: () => void;
} 
