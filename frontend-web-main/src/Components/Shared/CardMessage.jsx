import React from 'react';

export const CardMessage = ({ onClose, title, message }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card card-message">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>{title}</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">{message}</div>
        </div>
        <div className="fund-form-buttons">
          <button className="fund-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
