import React, { useEffect, useState } from "react";
import { apiGet, apiPut } from "../../services/api/axios.methods";
import { useToast, Box } from "@chakra-ui/react";
import ControlCard from "./ControlCard";

function ControlsWrapper() {
  // the styles of this components is in _controlCard.
  const toast = useToast();
  const [isAutoAcceptDelivery, setIsAutoAcceptDelivery] = useState();
  const [isAutoAcceptSchedule, setIsAutoAcceptSchedule] = useState();
  const [creditLimit, setCreditLimit] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  async function updateControls({ fieldName, value }) {
    console.log("update--controls");
    if (!isLoading) {
      setIsLoading(true);
      const { data, error } = await apiPut({
        url: `api/controls`,
        payload: {
          [fieldName]: value,
        },
      });

      if (data && !error) {
        setIsAutoAcceptDelivery(data?.data?.autoAcceptDelivery);
        setIsAutoAcceptSchedule(data?.data?.autoAcceptSchedules);
        setCreditLimit(data?.data?.creditLimit);
        toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="green" borderRadius="10">
              The controls have been successfully updated.
            </Box>
          ),
        });
      } else {
        toast({
          position: "bottom-left",
          render: () => (
            <Box color="white" p={3} bg="red" borderRadius="10">
              Controls cannot be updated at this moment
            </Box>
          ),
        });
      }
      setIsLoading(false);
    }
  }
  async function fetchControls() {
    if (isLoading) return;
    setIsLoading(true);
    const { data, error } = await apiGet(`/api/controls`);
    setIsLoading(false);
    if (data && !error) {
      setIsAutoAcceptDelivery(data?.data?.autoAcceptDelivery);
      setIsAutoAcceptSchedule(data?.data?.autoAcceptSchedules);
      setCreditLimit(data?.data?.creditLimit);
    }
  }
  useEffect(() => {
    fetchControls();
  }, []);

  return (
    <div className="controls-wrapper">
      <ControlCard
        isLoading={isLoading}
        updateControls={updateControls}
        setControl={setIsAutoAcceptDelivery}
        fetchControls={fetchControls}
        title="Auto accept deliveries"
        description="Automatically accept delivery requests from delivery personnel."
        icon="mdi:truck-check"
        value={isAutoAcceptDelivery}
        fieldName="autoAcceptDelivery"
      />
      <ControlCard
        isLoading={isLoading}
        updateControls={updateControls}
        fetchControls={fetchControls}
        title="Auto accept schedules"
        description="Automatically accept schedules/orders requests from customers"
        icon="mdi:invoice-schedule"
        value={isAutoAcceptSchedule}
        fieldName="autoAcceptSchedules"
      />
    </div>
  );
}

export default ControlsWrapper;
