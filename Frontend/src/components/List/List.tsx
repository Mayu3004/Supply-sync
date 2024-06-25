import styles from "./List.module.scss";
import { ListProps } from "./List.types.ts"

const List = ({ name, contact, points,email, onDelete, onUpdate }: ListProps) => {

    return (
        <div className={styles.ListContainer}>
            <div className={styles.ListInfo}>
                <h3>Name: {name}</h3>
                <h3>Contact No: {contact}</h3>
                 {/* <h3>Points: {points}</h3> */}
                 {points === undefined ? null : <h3>Points: {points}</h3>}
                 {email && <h4>email: {email}</h4>}
            </div>
            <div className={styles.ButtonContainer}>
                {onDelete && <button onClick={onDelete} className={`${styles.Button} ${styles.DeleteBtn}`}>Delete</button>}
                {onUpdate && <button onClick={onUpdate} className={`${styles.Button} ${styles.EditBtn}`}>Update</button>}
            </div>
        </div>
    )
}

export default List 
