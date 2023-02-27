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
import { getUsers } from "../../utils";
import styles from "../Comments/CommentsItems.module.scss";
import { EditButton } from "./EditButton/EditButton";

export const ActionButtons = ({ currentPost, handleReplay, handleEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const curentUser = getUsers();
  const [text, setText] = useState("");
  const Buttons = (
    <>
      <div className={styles.buttons}>
        {currentPost?.user?.id === curentUser.id && (
          <div className={styles.buttonsHover}>
            <EditButton handleEdit={handleEdit} className={styles.redit} />
            <Button colorScheme="red" size="sm" className={styles.deleate}>
              🗑️
            </Button>
          </div>
        )}
        {currentPost.parentPost && (
          <Button
            size="sm"
            onClick={onOpen}
            colorScheme="teal"
            className={styles.reply}
          >
            Reply
          </Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply to comment</ModalHeader>
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
                handleReplay(text);
                onClose();
              }}
            >
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  return Buttons;
};
