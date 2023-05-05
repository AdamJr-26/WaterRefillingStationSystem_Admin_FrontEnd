import React from "react";

import { Switch, Skeleton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
function ControlCard({
  title,
  description,
  icon,
  value,
  isLoading,
  fieldName,
  updateControls
}) {
  return (
    <div className="control-card">
      <div className="control-card--header">
        <p className="control-card--header__icon">
          <Icon icon={icon} />
        </p>
        <p className="control-card--header__indicator">{value? "On": "Off"}</p>
      </div>
      <div className="control-card--body">
        <p className="control-card--body__title">{title}</p>
        <p className="control-card--body__description">{description}</p>
      </div>
      <div className="control-card--witch">
        <Switch
          isChecked={value}
          onChange={(e) =>
            updateControls({
              value: e.target.checked,
              fieldName: fieldName,
            })
          }
          size="lg"
        />
      </div>
      {isLoading ? (
        <Skeleton
          opacity="90%"
          startColor="#e5e7eb"
          endColor="#f9fafb"
          className="control-card--skeleton"
        />
      ) : null}
    </div>
  );
}

export default ControlCard;
