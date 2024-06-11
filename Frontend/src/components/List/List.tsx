import styles from "./List.module.scss"; 
import { ListProps } from "./List.types.ts" 
 
const List = ({name,contact,sales,onDelete,onUpdate}: ListProps) => { 

    return(
        <div className={styles.ListContainer}>
            <div className={styles.ListInfo}>
                <h3>Name: {name}</h3>
                <h3>Contact No: {contact}</h3>
                {sales && <h3>Sales: ${sales}</h3>}
            </div>
            <div className={styles.ButtonContainer}>
              {onDelete && <button onClick={onDelete} className={styles.Button}>Delete</button>}
              {onUpdate && <button onClick={onUpdate} className={styles.Button}>Update</button>}
            </div>
        </div>
    )
} 
 
export default List 
