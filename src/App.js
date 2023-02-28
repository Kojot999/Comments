import styles from "./App.module.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { CommentsItems } from "./components/Comments/CommentsItems";
import { useEffect, useState } from "react";
import {
  getComments,
  getUsers,
  initalComment,
  initialUser,
  setComments,
  setUsers,
} from "./utils";
import { AddComment } from "./components/AddComment/AddComment";
import _ from "lodash";

export function App() {
  const [itemsState, setItemsState] = useState(getComments());

  useEffect(() => {
    _.isEmpty(getComments()) && setComments(initalComment);
    _.isEmpty(itemsState) && setItemsState(initalComment);
    !getUsers() && setUsers(initialUser);
  }, [itemsState]);
  return (
    <ChakraProvider>
      <div className={styles.wrapper}>
        <div className={styles.commentsWrapper}>
          {!_.isEmpty(itemsState) &&
            Object?.keys(itemsState)?.map((item, index) => (
              <CommentsItems
                key={index}
                id={item}
                setItemsState={setItemsState}
              />
            ))}
          <AddComment setItemsState={setItemsState} />
        </div>
      </div>
    </ChakraProvider>
  );
}
