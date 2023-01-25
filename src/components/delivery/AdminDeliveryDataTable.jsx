import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import DeliveryProgressModal from "./modal/DeliveryProgressModal";
import NoData from "../general/NoData";
function AdminDeliveryDataTableOngoing({ data, error, isValidating }) {
  // FETCH DELIVERIES WITH APPROVED:TRUE, RETURNED:FALSE

  const deliveryThead = [
    "IMAGE",
    "DELIVERY PERSONNEL",
    "MOBILE NUMBER",
    "VEHICLE IMAGE",
    "VEHICLE NAME",
    "VEHICLE ID",
  ];
  // handle modal
  const [deliveryId, setDeliveryId] = useState(null);
  const showDelivery = async (delivery_id) => {
    setDeliveryId(delivery_id);
    progressModalClosure.onOpen();
  };
  const progressModalClosure = useDisclosure();
  // { isOpen, onOpen, onClose }
  if (!data && !error && isValidating) {
    return <div>Loading.....</div>;
  } else if (data && !error && !isValidating) {
    if (data.data.length) {
      return (
        <TableContainer
          overflowX="auto"
          overflowY="hidden"
          display="block"
          whiteSpace="nowrap"
          className="chakra-table-container"
        >
          <DeliveryProgressModal
            isOpen={progressModalClosure.isOpen}
            onOpen={progressModalClosure.onOpen}
            onClose={progressModalClosure.onClose}
            deliveryId={deliveryId}
          />
          <Table>
            <Thead className="chakra-table-container--table__thead">
              <Tr className="thead--tr">
                {deliveryThead?.map((title) => (
                  <Th className="thead--tr__th" key={title}>
                    {title}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody className="chakra-table-container--table__tbody">
              {data?.data?.map((delivery) => (
                <Tr
                  onClick={() => showDelivery(delivery?._id)}
                  className="tbody-tr"
                  key={delivery._id}
                >
                  <Td className="tbody-tr--td">
                    <img
                      className="tbody-tr--image"
                      src={delivery?.delivery_personnel[0]?.display_photo}
                      alt=""
                    />
                  </Td>
                  <Td>
                    {delivery?.delivery_personnel[0]?.firstname +
                      " " +
                      delivery?.delivery_personnel[0]?.lastname}
                  </Td>
                  <Td>{delivery?.delivery_personnel[0]?.contact_number}</Td>
                  <Td className="tbody-tr--td">
                    <img
                      className="tbody-tr--image"
                      src={delivery?.vehicle[0]?.vehicle_image}
                      alt=""
                    />
                  </Td>
                  <Td>{delivery?.vehicle[0]?.vehicle_name}</Td>
                  <Td>{delivery?.vehicle[0]?.vehicle_id}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
    } else {
      return <NoData />;
    }
  } else {
    return (
      <div>
        <p>Error, click to refresh.</p>
      </div>
    );
  }
}

export default AdminDeliveryDataTableOngoing;
