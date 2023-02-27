import { Avatar, Box, Text } from "@chakra-ui/react";
import { useEditComment } from "../../hooks";
import { getComments, getUsers, setComments } from "../../utils";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import styles from "../Comments/CommentsItems.module.scss";

export const ReleatedComments = ({ setItemsState, id, parentId }) => {
  const allPosts = getComments();
  const parentComment = getComments()[parentId];
  const currentPost = getComments()[parentId].releatedComments[id];
  const { handleEdit } = useEditComment({
    id,
    parentComment: false,
    setItemsState,
    allPosts,
    currentPost,
    parentId,
  });
  const handleRate = (rateNumber) => {
    const payload = {
      [parentId]: {
        ...parentComment,
        releatedComments: {
          [id]: {
            ...currentPost,
            rate: {
              total: currentPost.rate.total + rateNumber,
              user: [getUsers()?.id],
            },
          },
        },
      },
    };
    setComments({ ...allPosts, ...payload });
    setItemsState({ ...allPosts, ...payload });
  };

  return (
    <div className={styles.wrapperReply}>
      <div className={styles.line} />
      <Box className={styles.containerReply}>
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
            <ActionButtons handleEdit={handleEdit} currentPost={currentPost} />
          </div>
          <div className={styles.comment}>{currentPost.text}</div>
        </div>
      </Box>
    </div>
  );
};
