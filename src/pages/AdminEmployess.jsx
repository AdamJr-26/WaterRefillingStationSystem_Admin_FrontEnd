import React from "react";
import AdminEmployeesDataTableDeliveryPersonels from "../components/employees/AdminEmployeesDataTableDeliveryPersonels";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@chakra-ui/react";
import AdminEmployeesNewPersonelModal from "../components/employees/AdminEmployeesNewPersonelModal";
import usePersonels from "../hooks/api/usePersonels";

function AdminEmployess() {
  const newPersonelClosure = useDisclosure();
  const { personels, personelsError } = usePersonels({
    url: "/api/delivery-personels",
  });
  return (
    <div className="admin-employees-page">
      <div className="admin-employee-personel-table">
        <div className="personel-search-new-wrapper">
          <div className="personel-search-new-wrapper--header">
            <p className="personel-search-new-wrapper--header__title">
              Delivery Personels
            </p>
            <p className="personel-search-new-wrapper--header__description">
              Manage your delivery personels.
            </p>
          </div>
          <div className="personel-search-new-wrapper--search-new-personel">
            <div className="personel-search-new-wrapper--search-new-personel__search">
              <button>
                <Icon icon="ic:baseline-search" />
              </button>
            </div>
            <div className="personel-search-new-wrapper--search-new-personel__new-personel">
              <button onClick={newPersonelClosure.onOpen}>
                <Icon icon="material-symbols:add" /> New Personel
              </button>
              <AdminEmployeesNewPersonelModal
                isOpen={newPersonelClosure.isOpen}
                onOpen={newPersonelClosure.onOpen}
                onClose={newPersonelClosure.onClose}
              />
            </div>
          </div>
        </div>
        <AdminEmployeesDataTableDeliveryPersonels data={personels?.data} />
      </div>
    </div>
  );
}

export default AdminEmployess;
