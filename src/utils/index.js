import moment from "moment";

export const getComments = () => {
  return JSON.parse(localStorage.getItem("comments"));
};
export const setComments = (data) => {
  return localStorage.setItem("comments", JSON.stringify(data));
};
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};
export const setUsers = (data) => {
  return localStorage.setItem("users", JSON.stringify(data));
};
export const initialUser = {
  id: 1,
  user_name: "Jan Kowalski",
  avatar:
    "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
};
export const initalComment = {
  initialPostId: {
    user: {
      id: 12,
      user_name: "InitialUser",
      avatar:
        "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
    },
    text: "Initial Comment, this comment is created initially for rating and replying only purpose, we cannot modify it because it was created by another user",
    rate: {
      total: 0,
      user: [12], //id of diffrent user
    },
    createdDate: moment().format("MMMM d, YYYY"),
    parentPost: true,
    releatedComments: {
      initialReplyId: {
        user: {
          id: 13,
          user_name: "InitialUser",
          avatar:
            "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
        },
        text: "Initial Comment reply created initially, we cannot modify it because it was created by another user",
        rate: {
          total: 0,
          user: [13], //id of diffrent user
        },
        createdDate: moment().format("MMMM d, YYYY"),
      },
    },
  },
};
