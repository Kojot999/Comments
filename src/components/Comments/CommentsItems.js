import { Avatar, Box, Text } from "@chakra-ui/react";
import _ from "lodash";
import { useEditComment, useReplyComment } from "../../hooks";
import { getComments, getUsers, setComments } from "../../utils";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import { ReleatedComments } from "../ReleatedComments.js/ReleadtedComments";
import styles from "./CommentsItems.module.scss";

export const CommentsItems = ({ id, setItemsState }) => {
  const currentPost = getComments()[id];
  const allPosts = getComments();
  const { handleReply } = useReplyComment({
    parentId: id,
    setItemsState,
    allPosts,
  });
  const { handleEdit } = useEditComment({
    id,
    parentComment: true,
    setItemsState,
    allPosts,
    currentPost,
  });
  const handleRate = (rateNumber) => {
    const payload = {
      [id]: {
        ...currentPost,
        rate: {
          total: currentPost.rate.total + rateNumber,
          user: [getUsers()?.id],
        },
      },
    };
    setComments({ ...allPosts, ...payload });
    setItemsState({ ...allPosts, ...payload });
  };
  const handleDelete = (id) => {
    const findPost = Object.keys(allPosts).filter((item) => item !== id);
    const deletePost = Object.fromEntries(
      findPost.map((item) => [[item], allPosts[item]])
    );
    setComments(deletePost);
    setItemsState(deletePost);
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <div className={styles.rate}>
          <div onClick={() => handleRate(1)}>+</div>
          <div>{currentPost?.rate?.total}</div>
          <div onClick={() => handleRate(-1)}>-</div>
        </div>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.user}>
              <Avatar className={styles.userIcon}></Avatar>
              <div className={styles.media}>
                <Text className={styles.userName}>
                  {currentPost?.user?.user_name}
                </Text>
                <Text className={styles.date}>{currentPost.createdDate}</Text>
              </div>
            </div>
            <ActionButtons
              handleReply={handleReply}
              currentPost={currentPost}
              handleEdit={handleEdit}
              handleDelete={() => handleDelete(id)}
              id={id}
            />
          </div>
          <div className={styles.comment}>{currentPost.text}</div>
        </div>
      </Box>
      {!_.isEmpty(currentPost.releatedComments) &&
        Object?.keys(currentPost.releatedComments)?.map((item, index) => (
          <ReleatedComments
            setItemsState={setItemsState}
            id={item}
            key={index}
            parentId={id}
          />
        ))}
    </>
  );
};
