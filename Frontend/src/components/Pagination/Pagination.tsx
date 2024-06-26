
import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.types';

const Pagination = ({ currentPage, totalPages, onPageChange }:PaginationProps) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.PaginationContainer}>
            <button 
                className={styles.PageButton} 
                onClick={handlePrevious} 
                disabled={currentPage === 1}
            >
                &lt; Previous
            </button>
            <span className={styles.PageInfo}>
                Page {currentPage} 
            </span>
            <button 
                className={styles.PageButton} 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
            >
                Next &gt;
            </button>
        </div>
    );
};

export default Pagination;
