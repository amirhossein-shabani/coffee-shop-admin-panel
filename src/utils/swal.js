import Swal from "sweetalert2";

export async function confirm({
  title = "آیا مطمئن هستید؟",
  text = "این عملیات قابل بازگشت نیست.",
  confirmButtonText = "بله",
  cancelButtonText = "خیر",
} = {}) {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
  });

  return result.isConfirmed;
}

export function alert(title = "", text = "") {
  return Swal.fire({ title, text, icon: "info" });
}

export function toastSuccess(title = "با موفقیت انجام شد") {
  return Swal.fire({
    toast: true,
    position: "top",
    icon: "success",
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

export function toastError(title = "خطا رخ داد") {
  return Swal.fire({
    toast: true,
    position: "top",
    icon: "error",
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

export default Swal;
