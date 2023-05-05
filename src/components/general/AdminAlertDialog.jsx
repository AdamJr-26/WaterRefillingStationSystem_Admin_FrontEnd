import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
// used the item and setItem to choose item on a mapped items that you want to make an aciotn.
function AdminAlertDialog({ isOpen, onOpen, onClose, submit, item, }) {
  const cancelRef = React.useRef();
  return (
    <>
      <Stack direction="row" spacing={4}>
        <Button
          onClick={onOpen}
          leftIcon={<Icon icon="material-symbols:delete" />}
          colorScheme="blue"
          backgroundColor="#2389DA"
          variant="solid"
        >
          Delete
        </Button>
      </Stack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Promo
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => submit({ item })} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AdminAlertDialog;
