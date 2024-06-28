
import {  useEffect } from 'react';
import Card from '../Card/Card';
import styles from './Merchandise.module.scss';
import { MerchandiseData, MerchandiseProps } from './Merchandise.types';
import { deleteMerchandise, fetchMerchandise } from '../../services/manufacturer.Merchandise';
import MerchandiseForm from '../MerchandiseForm/MerchandiseForm';
import Pagination from '../Pagination/Pagination';
import { MerchandiseProvider, useMerchandiseContext } from './MerchandiseContext';
import { toast } from 'react-toastify';


const Merchandise= ({}:MerchandiseProps) => {
    const { state, dispatch } = useMerchandiseContext();

  useEffect(() => {
    fetchMerchandiseHandler(state.currentPage);
  }, [state.currentPage]);

  const fetchMerchandiseHandler = async (page: number) => {
    try {
      const value = await fetchMerchandise(page);
      dispatch({ type: 'SET_MERCHANDISES', payload: value });
    } catch (error) {
      console.error('Error fetching merchandise:', error);
    }
  };

  const handleUpdate = (merchandise: MerchandiseData) => {
    dispatch({ type: 'SET_SELECTED_MERCHANDISE', payload: merchandise });
    dispatch({ type: 'SET_MODAL_OPEN', payload: true });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMerchandise(id);
      dispatch({
        type: 'SET_MERCHANDISES',
        payload: state.merchandises.filter(
          (merchandise) => merchandise._id !== id
        ),
      });
      toast.success("Merchandise deleted successfully")
    } catch (error) {
      console.error('Error deleting merchandise:', error);
    }
  };

  const closeModal = () => {
    dispatch({ type: 'SET_MODAL_OPEN', payload: false });
    dispatch({ type: 'SET_SELECTED_MERCHANDISE', payload: null });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const handleSubmit = async(formData: MerchandiseData) => {
    dispatch({
      type: 'SET_MERCHANDISES',
      payload: state.merchandises.map((merchandise) =>
        merchandise._id === formData._id ? formData : merchandise
      ),
    });
    closeModal();
    await fetchMerchandiseHandler(state.currentPage);
  };

  return (
    <div className={styles.MerchandiseContainer}>
      <button
        className={styles.AddBtn}
        onClick={() => dispatch({ type: 'SET_MODAL_OPEN', payload: true })}
      >
        ADD
      </button>

      <div className={styles.MerchandiseDataContainer}>
        {state.merchandises.map((merchandise, index) => (
          <Card
            key={index}
            title={merchandise.merchandiseName}
            description={merchandise.merchandiseDescription}
            points={merchandise.pointsRequired}
            photoUrl={merchandise.merchandiseImage}
            onUpdate={() => handleUpdate(merchandise)}
            onDelete={() => handleDelete(merchandise._id)}
          />
        ))}
      </div>
      {state.modalOpen && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <button className={styles.CloseBtn} onClick={closeModal}>
              X
            </button>
            <MerchandiseForm
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              merchandise={state.selectedMerchandise}
            />
          </div>
        </div>
      )}
      <div className={styles.Footer}>
        <Pagination
          currentPage={state.currentPage}
          totalPages={state.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

const MerchandiseWrapper = () => (
  <MerchandiseProvider>
      <Merchandise />
  </MerchandiseProvider>
);

export default MerchandiseWrapper;
