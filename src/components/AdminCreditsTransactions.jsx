import React from "react";

function AdminCreditsLastransactions() {
  return (
    <div className="transactions-wrapper">
      <p>History</p>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <div className="transactions-wrapper--item" key={index}>
          <img src="https://picsum.photos/200" alt="" srcSet="" />
          <div className="transactions-wrapper--item__person-info">
            <span className="name">Jose Mari </span>
            <span className="address">
              #545 Mahogany st. Bunsuran 2nd, Pandi, bulacan
            </span>
            <div className="regular-date-wrapper">
              <span className="role">Regular</span>
              <span className="date">September 26th, 2022</span>
            </div>
          </div>
          <div className="transactions-wrapper--item__amount-buttons">
            <p className="amount">P 360</p>
            <button>move to trash</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCreditsLastransactions;
