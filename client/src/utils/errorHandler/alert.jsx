import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const alertFromServerResponse = async (response) => {
    if (!response) {
        await MySwal.fire({
            title: "Error",
            text: "No response received from server",
            icon: "error",
            confirmButtonColor: '#d33',
        });
        return;
    }

    const { success, message } = response;

    if (success === true) {
        toast.success(message || "Action performed successfully!", {
            position: "top-center",
            autoClose: 2000,
        });
    } else {
        await MySwal.fire({
            title: "Error",
            text: message || "Something went wrong!",
            icon: "error",
            confirmButtonColor: '#d33',
        });
    }
};

const alertCart = (count, itemNombre) => {
    alertFromServerResponse({
        statusCode: 200,
        success: true,
        message: `Added ${count} units of ${itemNombre} to your cart.`,
        data: { count, itemNombre }
    });
};

const alertRemove = () => {
    alertFromServerResponse({
        statusCode: 400,
        success: false,
        message: 'It is not possible to decrease by 1 unit',
        data: null
    });
};

const alertLoginError = () => {
    alertFromServerResponse({
        statusCode: 400,
        success: false,
        message: 'The username or password is incorrect.',
        data: null
    });
};

const alertLoginSuccess = (username) => {
    alertFromServerResponse({
        statusCode: 200,
        success: true,
        message: `Welcome ${username}!`,
        data: { username }
    });
};

const alertLogOut = (username) => {
    alertFromServerResponse({
        statusCode: 200,
        success: true,
        message: `Goodbye ${username}!`,
        data: null
    });
};

const changeStatusAlert = (currentStatus, newStatus) => {
    return new Promise((resolve) => {
        MySwal.fire({
            title: 'Change Order Status?',
            text: `Are you sure you want to change the status from '${currentStatus}' to '${newStatus}'?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            resolve(result.isConfirmed);  
        });
    });
};

export {
    alertFromServerResponse,
    alertCart,
    alertRemove,
    alertLoginError,
    alertLoginSuccess,
    alertLogOut,
    changeStatusAlert
};