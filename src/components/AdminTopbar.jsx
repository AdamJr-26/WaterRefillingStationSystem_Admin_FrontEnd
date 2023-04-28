import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { updateSidebarStatus } from "../lib/store/sideBarState";
import { useAuth } from "../hooks/auth";
import { useDispatch } from "react-redux";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Image,
  Text,
  Container,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import AdminResetPassword from "./Admin/AdminResetPassword";
import DateTime from "./general/DateTime";
import Profile from "./general/modal/Profile";
function AdminTopbar() {
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const active_route = window.location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateSidebarStatus());
  }, [active_route]);
  const { userProfile } = useAuth();
  const user = userProfile?.data;
  // ======= logut --------------

  // change display photo
  function handleChangePhoto() {
    
  }
  return (
    <div className="topbar">
      <div className="topbar--menu-btn">
        <button onClick={() => dispatch(updateSidebarStatus())}>
          <Icon icon="dashicons:menu" />
        </button>
        <p className="route"></p>
      </div>
      <div className="topbar--right-options">
        <div
          className="topbar--right-options__profile"
          ref={btnRef}
          onClick={onOpen}
        >
          <div>
            <p className="name">{user?.firstname?.toUpperCase()}</p>
            <p className="wrs-name">{user?.wrs_name}</p>
          </div>
          <img src={user.display_photo} alt="admin" srcSet="" />
        </div>
      </div>
      <Profile onClose={onClose} isOpen={isOpen} user={user} handleChangePhoto={handleChangePhoto} />
    </div>
  );
}

export default AdminTopbar;
