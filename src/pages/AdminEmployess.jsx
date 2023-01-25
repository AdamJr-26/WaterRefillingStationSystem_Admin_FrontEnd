import React from "react";
import AdminEmployeesDataTableDeliveryPersonnels from "../components/employees/AdminEmployeesDataTableDeliveryPersonels";
import { Icon } from "@iconify/react";
import { useDisclosure } from "@chakra-ui/react";
import AdminEmployeesNewPersonnelModal from "../components/employees/AdminEmployeesNewPersonnelModal";
import usePersonnels from "../hooks/api/usePersonnels";

function AdminEmployess() {
  const newPersonelClosure = useDisclosure();
  const { personnels, personelsError } = usePersonnels({
    url: "/api/delivery-personels",
  });
  return (
    <div className="admin-employees-page">
      <div className="admin-employee-personel-table">
        <div className="personel-search-new-wrapper">
          <div className="personel-search-new-wrapper--header">
            <p className="personel-search-new-wrapper--header__title">
              Delivery Personnels
            </p>
            <p className="personel-search-new-wrapper--header__description">
              Manage your delivery personnels.
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
                <Icon icon="material-symbols:add" /> New Personnel
              </button>
              <AdminEmployeesNewPersonnelModal
                isOpen={newPersonelClosure.isOpen}
                onOpen={newPersonelClosure.onOpen}
                onClose={newPersonelClosure.onClose}
              />
            </div>
          </div>
        </div>
        <AdminEmployeesDataTableDeliveryPersonnels data={personnels?.data} />
      </div>
    </div>
  );
}

export default AdminEmployess;
