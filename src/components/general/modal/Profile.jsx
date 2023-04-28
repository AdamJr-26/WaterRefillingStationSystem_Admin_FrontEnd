import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/auth";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
  useToast,
} from "@chakra-ui/react";
import AdminResetPassword from "../../Admin/AdminResetPassword";
import { apiPut } from "../../../services/api/axios.methods";

function Profile({ onClose, isOpen, user, handleChangePhoto }) {
  // alert
  const warning = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const { userProfile, userProfileError, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  const [dataImageUrl, setDataImageUrl] = useState(null);
  const [displayPhoto, setDisplayPhoto] = useState(null);
  async function handleChangeDisplayPhoto() {
    if (dataImageUrl === null) return;
    // update
    const { data, error } = await apiPut({
      url: "/api/admin/profile",
      payload: {
        image: dataImageUrl,
      },
    });
    if (data && !error) {
      toast({
        title: "Update Profile",
        description: "Update image profile successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed",
        description: "Update failed. Please try reducing the file size and attempting again",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    handleChangeDisplayPhoto();
    setDisplayPhoto(user.display_photo);
  }, [dataImageUrl]);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Admin</Tab>
              <Tab>WRS Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Stack justify="center" spacing="10px" marginBottom="50px">
                  {/* <Image
                    alignSelf="center"
                    borderRadius="full"
                    boxSize="100px"
                    src={user.display_photo}
                    alt="Admin"
                    backgroundColor="gray.100"
                  /> */}
                  <div className="admin-set-profile">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      id=""
                      onChange={(e) => {
                        let files = e.target.files;
                        let reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                          setDataImageUrl(e.target.result);
                        };
                        // setDisplayPhoto(files[0]);
                      }}
                    />
                    {dataImageUrl || displayPhoto ? (
                      <img
                        src={dataImageUrl ? dataImageUrl : displayPhoto}
                        alt=""
                        srcSet=""
                        style={{ backgroundColor: "#d1d5db", borderRadius: 15 }}
                      />
                    ) : (
                      <Icon icon="bx:image-add" className="icon" />
                    )}
                  </div>
                  <Text textAlign="center" fontSize="xl">{`${user?.firstname} 
                    ${user?.lastname}`}</Text>
                </Stack>

                <Container
                  width="100%"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Button
                    onClick={handleChangePhoto}
                    colorScheme="blue"
                    variant="solid"
                    width="100%"
                    background="#f3f4f6"
                    type="button"
                    height="50px"
                    color="blackAlpha.800"
                    _hover={{ color: "white", backgroundColor: "#2389DA" }}
                  >
                    Change display photo
                  </Button>
                  <AdminResetPassword />
                  <Button
                    onClick={warning.onOpen}
                    leftIcon={<Icon icon="majesticons:logout-half-circle" />}
                    colorScheme="blue"
                    variant="solid"
                    width="100%"
                    background="#f3f4f6"
                    type="button"
                    height="50px"
                    color="blackAlpha.800"
                    _hover={{ color: "white", backgroundColor: "#2389DA" }}
                  >
                    Logout
                  </Button>
                </Container>
              </TabPanel>
              <TabPanel>
                <p>Edit wrs settings</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
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

                <AlertDialogBody>
                  Are you sure you want to logout?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    type="button"
                    ref={cancelRef}
                    onClick={warning.onClose}
                  >
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
          {/* <Button onClick={onClose}>Close</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Profile;
