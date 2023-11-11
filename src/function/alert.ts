import Swal from "sweetalert2"

export const inDevelopment = () => {
  Swal.fire({
    title: 'In Development',
    text: 'This feature is in development',
    icon: 'info',
    confirmButtonText: 'Ok'
  })
}