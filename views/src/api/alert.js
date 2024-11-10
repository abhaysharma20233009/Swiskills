export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();

  // Define colors based on alert type (e.g., success, error)
  const baseStyles =
    'alert fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg text-white text-center max-w-sm';
  const typeStyles = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  const markup = `<div class="${baseStyles} ${typeStyles}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
