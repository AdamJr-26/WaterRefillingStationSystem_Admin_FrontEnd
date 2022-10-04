import React from "react";
import { Icon } from "@iconify/react";

function AdmincustomerViewer({closeViewer}) {
  return (
    <div className="viewer">
      <div className="viewer--header">
        <span>Viewing Customer</span>
        <button onClick={()=>closeViewer('')} >
          <Icon icon="bi:x" />
        </button>
      </div>
      <div>
        <div className="viewer--basic">
          <img src="https://picsum.photos/200" alt="image" />
          <span>Avril Lavigne</span>
        </div>
        <div className="viewer--info">
          <div className="viewer--info__contact-number">
            <span>
              <Icon icon="fluent:call-28-regular" />
            </span>
            <span>0916545455</span>
          </div>
          <div className="viewer--info__address">
            <span>
              <Icon icon="cil:location-pin" />
            </span>
            <span>Mahogany St. Bunsuran 1st, Pandi</span>
          </div>
        </div>
        <div className="viewer--enagement">
          <div className="viewer--enagement__card">
            <span>-P 750</span>
            <span>Balance</span>
          </div>
          <div className="viewer--enagement__card">
            <span>300</span>
            <span>Total Balance</span>
          </div>
        </div>
        <div>
            buttons here for changing customer type:
        </div>
      </div>
    </div>
  );
}

export default AdmincustomerViewer;
