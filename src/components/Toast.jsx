import React, { useEffect } from "react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]); // 👈 agora reage à mudança da mensagem

  if (!message) return null;

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
