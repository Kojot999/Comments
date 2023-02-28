import { getComments, getUsers, setComments } from "../utils";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const useReplyComment = ({ setItemsState, allPosts, parentId }) => {
  const parentComment = getComments()[parentId];
  const handleReply = (replyText) => {
    const payload = {
      [parentId]: {
        ...parentComment,
        releatedComments: {
          ...parentComment.releatedComments,
          [uuidv4()]: {
            user: getUsers(),
            text: replyText,
            rate: { total: 0, users: [] },
            createdDate: moment().format("MMMM d, YYYY"),
          },
        },
      },
    };
    !!replyText && setComments({ ...allPosts, ...payload });
    !!replyText && setItemsState({ ...allPosts, ...payload });
  };
  return { handleReply };
};

export const useEditComment = ({
  id,
  setItemsState,
  allPosts,
  parentComment,
  currentPost,
  parentId,
}) => {
  const parentCommentContent = getComments()[parentId];
  const handleEdit = (editText) => {
    const payload = parentComment
      ? {
          [id]: {
            ...currentPost,
            text: editText,
          },
        }
      : {
          [parentId]: {
            ...parentCommentContent,
            releatedComments: {
              ...parentCommentContent.releatedComments,
              [id]: {
                ...currentPost,
                text: editText,
              },
            },
          },
        };
    !!editText && setComments({ ...allPosts, ...payload });
    !!editText && setItemsState({ ...allPosts, ...payload });
  };
  return { handleEdit };
};
