import Swal from "sweetalert2";

const SuccessAlert = ({ title, text }) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

const DeleteAlert = ({ title, text, deleteClick }) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteClick();
    }
  });
};

export { SuccessAlert, DeleteAlert };
