//toastify structure that provides notifications to be shown on the screen

import { toast } from "react-toastify";

const toastMessage = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;

    default:
      toast.error(message, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      break;
  }
};

export default toastMessage;
