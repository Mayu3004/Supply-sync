export interface CardProps {
    title: string;
    description: string;
    price?: number;
    photoUrl?: string;
    quantity?: number;
    points?: number;
    onUpdate?: () => void;
    onDelete?: () => void;
    onRedeem?:() =>void;
    onAddToCart?:(quantity:number)=>void;
    children?: React.ReactNode;
} 
