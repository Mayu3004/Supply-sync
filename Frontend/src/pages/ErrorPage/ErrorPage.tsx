
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import { ErrorPageProps } from './ErrorPage.types';

const ErrorPage = ({}:ErrorPageProps) => {
    
    
  return (
    <div className={styles.ErrorContainer}>
      <h1 className={styles.ErrorTitle}>Oops! Something went wrong.</h1>
      <p className={styles.ErrorMessage}>We're sorry for the inconvenience. Please try again later.</p>
      <Link to="/" className={styles.HomeLink}>Go to Login</Link>
    </div>
  );
};

export default ErrorPage;
