 export interface MerchandiseData {
   _id:string
   merchandiseName: string;
   merchandiseDescription: string;
   pointsRequired: number;
   merchandiseImage: string;
   username?:string
   status?:string;
   distributorId?:string;
   merchandiseId?:string;
  }
 
 export interface MerchandiseProps {
    // merchandises: Merchandise[];
    //   onUpdate: () => void;
    //   onDelete: () => void;
 } 
