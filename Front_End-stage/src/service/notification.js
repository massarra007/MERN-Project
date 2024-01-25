import Axios from "axios";

export const getNotification = async (id) => {
  const result = await Axios.get("http://localhost:5000/notification/getid/" + id);

  return result.data;
};

export const updateNotif = async (id) => {
    const result = await Axios.post("http://localhost:5000/notification/updatenotif/" + id);
  
    return result.data;
  };
  
  export const getNotificationseen = async (id) => {
    const result = await Axios.get("http://localhost:5000/notification/getseen/" + id);
    return result.data;
  };
  