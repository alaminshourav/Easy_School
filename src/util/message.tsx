import { toast } from "react-toastify";

// react toast success message
export const addSuccessfully = (addedMessage: string) => {
  toast.success(addedMessage, {});
};

// react toast err message
export const toastError = (errorMessage: string) => {
  toast.error(errorMessage, {});
};
