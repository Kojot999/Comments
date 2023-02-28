import { Avatar, Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { getComments, getUsers, setComments } from "../../utils";
import styles from "./AddComment.module.scss";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const AddComment = ({ setItemsState }) => {
  const [state, setState] = useState("");
  const onTextChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = () => {
    const comments = getComments();
    const payload = {
      ...comments,
      [uuidv4()]: {
        user: getUsers(),
        text: state,
        rate: { total: 0, users: [] },
        createdDate: moment().format("MMMM d, YYYY"),
        parentPost: true,
      },
    };
    !!state && setComments(payload);
    !!state && setItemsState(payload);
    setState("");
  };
  return (
    <Box className={styles.wrapper}>
      <Avatar />
      <Textarea
        value={state}
        onChange={onTextChange}
        placeholder="Add a comment..."
      ></Textarea>
      <Button onClick={handleSubmit} colorScheme="blue">
        SEND
      </Button>
    </Box>
  );
};
