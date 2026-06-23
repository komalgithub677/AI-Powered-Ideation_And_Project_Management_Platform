// src/api/chatApi.js

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/chat";

export const sendMessage = async (
  receiverEmail,
  message,
  token
) => {

  const res = await axios.post(
    `${BASE_URL}/send`,
    {
      receiverEmail,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getHistory = async (
  receiverEmail,
  token
) => {

  const res = await axios.get(
    `${BASE_URL}/history`,
    {
      params: {
        receiverEmail,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};