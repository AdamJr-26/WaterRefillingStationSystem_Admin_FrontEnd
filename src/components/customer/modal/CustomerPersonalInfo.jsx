import React from "react";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import CreditsTabPanel from "./panels/CreditsTabPanel";
import BorrowsTabPanel from "./panels/BorrowsTabPanel";
import ReturnsHistory from "./panels/ReturnsHistory";
import PurchasesHistory from "./panels/PurchasesHistory";
import PaymentsHistory from "./panels/PaymentsHistory";

function CustomerPersonalInfo({ isOpen, onOpen, onClose, selectedCustomer }) {
  console.log("selectedCustomer", selectedCustomer);
  return selectedCustomer ? (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="customer-info-full-modal">
            <div className="customer-info-full-modal--profile">
              <div className="customer-info-full-modal--profile__image-wrapper">
                <img src={selectedCustomer?.display_photo} alt="" />
              </div>
              <div className="customer-info-full-modal--profile__info">
                <div className="customer-fullname">
                  <p>
                    {selectedCustomer.firstname +
                      " " +
                      selectedCustomer.lastname}
                  </p>
                </div>
                <div className="customer-mobile-number">
                  <p>{selectedCustomer.mobile_number}</p>
                </div>
                <div className="customer-address">
                  <p>
                    {selectedCustomer.address.street +
                      " " +
                      selectedCustomer.address.barangay +
                      " " +
                      selectedCustomer.address.municipal_city +
                      " " +
                      selectedCustomer.address.province}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Tabs>
                <TabList>
                  <Tab>Credits</Tab>
                  <Tab>Borrows</Tab>
                  <Tab>History</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <CreditsTabPanel customer_id={selectedCustomer?._id} />
                  </TabPanel>
                  <TabPanel>
                    <BorrowsTabPanel customer_id={selectedCustomer?._id} />
                  </TabPanel>
                  <TabPanel>
                    <Tabs>
                      <TabList>
                        <Tab>Returns </Tab>
                        {/* <Tab>Purchases</Tab> */}
                        <Tab>Debt payments</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <ReturnsHistory customer_id={selectedCustomer?._id} />
                        </TabPanel>
                        {/* <TabPanel>
                          <PurchasesHistory
                            customer_id={selectedCustomer?._id}
                          />
                        </TabPanel> */}
                        <TabPanel>
                          <PaymentsHistory
                            customer_id={selectedCustomer?._id}
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null;
}

export default CustomerPersonalInfo;
