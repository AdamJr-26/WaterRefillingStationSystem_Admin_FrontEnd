import React, { useEffect, useState } from "react";
import { apiGet } from "../../../../services/api/axios.methods";
import PayCreditsModal from "../../../general/modal/PayCreditsModal";
import { useDisclosure } from "@chakra-ui/react";
function CreditsTabPanel({ customer_id }) {
  console.log("customer_id", customer_id);
  const [credits, setCredits] = useState([]);
  async function getCredits() {
    if (!customer_id) return;
    const { data, error } = await apiGet(`/api/all/credits/${customer_id}`);
    console.log("data00=-------------", data);
    if (data && !error) {
      console.log("data", data);
      setCredits(data?.data);
    } else {
      console.log("errr", error);
    }
  }
  useEffect(() => {
    getCredits();
  }, [customer_id]);

  //   PAY CREDITS MODAL.
  const [selectedCredit, setSelectedCredit] = useState(null);
  const paycreditsClosure = useDisclosure();
  return (
    <div className="credits-tab-panel-wrapper">
      <p>Current credits</p>
      {/* MODAL */}
      <PayCreditsModal
        isOpen={paycreditsClosure.isOpen}
        onOpen={paycreditsClosure.onOpen}
        onClose={paycreditsClosure.onClose}
        credit={selectedCredit}
        mutatePagination={getCredits}
      />
      {credits?.map((credit, i) => (
        <div
          onClick={() => {
            setSelectedCredit(credit);
            paycreditsClosure.onOpen();
          }}
          key={i}
          className="credits-tab-panel"
        >
          <div className="credits-tab-panel--image-info-wrapper">
            <div className="credits-tab-panel--image-info-wrapper__gallon-image-wrapper">
              <img src={credit.gallon.gallon_image} alt="" />
            </div>
            <div className="credits-tab-panel--image-info-wrapper__gallon-info">
              <p>{credit.gallon.name}</p>
              <p>{credit.gallon.liter} liters</p>
            </div>
          </div>
          <div className="credits-tab-panel--amount-count-wrapper">
            <div className="credits-tab-panel--amount-count-wrapper__count">
              <p>Count</p>
              <p>{credit.total}</p>
            </div>
            <div className="credits-tab-panel--amount-count-wrapper__price">
              <p>Price</p>
              <p>{credit.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CreditsTabPanel;
