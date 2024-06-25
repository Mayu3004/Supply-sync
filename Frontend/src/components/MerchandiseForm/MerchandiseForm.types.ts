import { MerchandiseData } from "../Merchandise/Merchandise.types";

 export interface MerchandiseFormProps {
    closeModal: () => void;
    handleSubmit: (data: MerchandiseData) => void;
    merchandise: MerchandiseData | null
 } 
