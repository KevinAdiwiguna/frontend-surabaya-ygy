import { useState } from "react";
import axios from "axios";

export const useSidebar = () => {
  const [sidebarContent, setSidebarContent] = useState([]);

  const getAllSideBar = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/menu`);
      setSidebarContent(response);
    } catch (error) {
      console.log(error);
    }
    return {
      getAllSideBar,
      sidebarContent,
    };
  };
};
