import React, { useEffect, useState } from "react";
import { apiGet } from "../../../../services/api/axios.methods";
import { useDisclosure } from "@chakra-ui/react";
import ReturnBorrowedGallonModal from "../../../general/modal/ReturnBorrowedGallonModal";
function BorrowsTabPanel({ customer_id }) {
  console.log("customer_id", customer_id);
  const [borrowed, setBorrowed] = useState([]);
  const [selectedBorrowed, setSelectedBorrowed] = useState("");
  async function getBorrowedGallons() {
    if (!customer_id) return;
    const { data, error } = await apiGet(
      `/api/borrowed/gallons/${customer_id}`
    );
    console.log("data00=-------------", data);
    if (data && !error) {
      console.log("data", data);
      setBorrowed(data?.data);
    } else {
      console.log("errr", error);
    }
  }
  useEffect(() => {
    getBorrowedGallons();
  }, [customer_id]);

  // modal
  const returnGallonModalDC = useDisclosure();
  return (
    <div className="borrow-tab-panel-wrapper">
      {/* modal */}
      <ReturnBorrowedGallonModal
        borrow={selectedBorrowed}
        isOpen={returnGallonModalDC.isOpen}
        onOpen={returnGallonModalDC.onOpen}
        onClose={returnGallonModalDC.onClose}
        get_borrowed={getBorrowedGallons}
      />
      <p>Current borrowed gallons</p>
      {borrowed?.map((borrowed, i) => (
        <div
          onClick={() => {
            returnGallonModalDC.onOpen();
            setSelectedBorrowed(borrowed);
          }}
          key={i}
          className="borrow-tab-panel"
        >
          <div className="borrow-tab-panel--image-info-wrapper">
            <div className="borrow-tab-panel--image-info-wrapper__gallon-image-wrapper">
              <img src={borrowed.gallon.gallon_image} alt="" />
            </div>
            <div className="borrow-tab-panel--image-info-wrapper__gallon-info">
              <p>{borrowed.gallon.name}</p>
              <p>{borrowed.gallon.liter} liters</p>
            </div>
          </div>
          <div className="borrow-tab-panel--amount-count-wrapper">
            <div className="borrow-tab-panel--amount-count-wrapper__count">
              <p>Count</p>
              <p>{borrowed.total}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BorrowsTabPanel;
