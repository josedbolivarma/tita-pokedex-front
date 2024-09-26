import { useCallback } from 'react';
import Swal from 'sweetalert2';

// Custom hook for SweetAlert
export const useAlert = () => {

  // Success alert
  const showSuccess = useCallback((title: string, message: string) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#3085d6',
    });
  }, []);

  // Error alert
  const showError = useCallback((title: string, message: string) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#d33',
    });
  }, []);

  // Info alert
  const showInfo = useCallback((title: string, message: string) => {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonColor: '#3085d6',
    });
  }, []);

  // Warning alert with confirmation
  const showConfirm = useCallback(async (title: string, message: string) => {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    });
    return result.isConfirmed;
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showConfirm
  };
};