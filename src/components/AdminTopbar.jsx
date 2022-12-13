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
function AdminTopbar() {
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // alert
  const warning = useDisclosure();
  const cancelRef = React.useRef();
  // --
  const [pathname, setPathname] = useState();
  const active_route = window.location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateSidebarStatus());
    setPathname(active_route);
  }, [active_route]);
  const { userProfile, userProfileError, logout } = useAuth();
  const user = userProfile?.data;
  // ======= logut --------------
  const handleLogout = async () => {
    await logout();
  };
  // hindi nag rerender ang pathname dahil hindi nag rererun ang buong component
  return (
    <div className="topbar">
      <div className="topbar--menu-btn">
        <button onClick={() => dispatch(updateSidebarStatus())}>
          <Icon icon="dashicons:menu" />
        </button>
        <p className="route"></p>
      </div>
      <div className="topbar--right-options">
        <DateTime />
        <div className="topbar--right-options__profile" ref={btnRef} onClick={onOpen}>
          <span className="name">{user?.firstname?.toUpperCase()}</span>
          <img src="https://picsum.photos/200" alt="admin image" srcSet="" />
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile</DrawerHeader>

          <DrawerBody>
            <Tabs>
              <TabList>
                <Tab>Admin</Tab>
                <Tab>WRS Settings</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Stack justify="center" spacing="10px">
                    <Image
                      alignSelf="center"
                      borderRadius="full"
                      boxSize="100px"
                      src="https://picsum.photos/200"
                      alt="Dan Abramov"
                    />
                    <Text
                      textAlign="center"
                      fontSize="xl"
                    >{`${user?.firstname?.toUpperCase()} 
                    ${user?.lastname?.toUpperCase()}`}</Text>
                  </Stack>

                  <Container width="100%">
                    <AdminResetPassword />
                  </Container>
                </TabPanel>
                <TabPanel>
                  <p>Edit wrs settings</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter>
            <Button
              onClick={warning.onOpen}
              leftIcon={<Icon icon="majesticons:logout-half-circle" />}
              background=""
              width="100%"
              color="#FF7046"
              _hover={{ backGround: "white", opacity: 0.7 }}
              _focus={{ background: "#f3f4f6" }}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* ============== alert dialog ================= */}
      <AlertDialog
        isOpen={warning.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={warning.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log Out?
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>

            <AlertDialogFooter>
              <Button type="button" ref={cancelRef} onClick={warning.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                backgroundColor="#FF7046"
                ml={3}
                type="submit"
                onClick={handleLogout}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default AdminTopbar;
