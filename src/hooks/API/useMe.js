import React, { useState } from "react";
import axios from "axios";

export const useMe = () => {
  const [response, setResponse] = useState([]);
  const fetchMe = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/me`
      );
      setResponse(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    response,
    fetchMe,
  };
};
