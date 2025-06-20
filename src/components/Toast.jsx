import React, { useEffect, useState } from 'react'

function Toasty ({ id, type = 'success', message, duration = 3000, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const backgroundColors = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColors[type] || '#6b7280',
      }}>
      <span>{message}</span>
      <button
        onClick={() => onClose(id)}>X</button>
    </div>
  )
}

const Toast = () => {

  const [toast, setToast] = useState([]);

  const showToast = (message, type) => {
    const id = Date.now();
    setToast((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToast((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
    <div>
      <h2>React Toast Component</h2>
      <button onClick={() => showToast('Success! Everything worked.', 'success')}>
        Show Success
      </button>
      <button onClick={() => showToast('Something went wrong!', 'error')}>
        Show Error
      </button>
      <button onClick={() => showToast('Be careful with that input.', 'warning')}>
        Show Warning
      </button>

      {/* Toast Container */}
      <div>
        {
          toast.map((toast) => (
            <Toasty
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={removeToast}
            />
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Toast