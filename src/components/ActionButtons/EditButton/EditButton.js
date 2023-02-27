import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import styles from "../../Comments/CommentsItems.module.scss";

export const EditButton = ({ handleEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="green"
        size="sm"
        className={styles.edit}
      >
        ✏️
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                handleEdit(text);
                onClose();
              }}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
