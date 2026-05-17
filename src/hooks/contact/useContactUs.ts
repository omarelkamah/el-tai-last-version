import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface ContactUsValues {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}

export const useContactUs = () => {
    const {
        mutateAsync: contactUsMutation,
        isPending: contactUsLoading,
        error,
    } = useMutation({
        mutationFn: (values: ContactUsValues) =>
            axiosInstance.post("/contact-inquiries", values),
        onSuccess: () => {
            toast.success("تم إرسال رسالتك بنجاح. سنرد عليك في أقرب وقت.");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
            );
        },
    });

    return {
        contactUsMutation,
        contactUsLoading,
        error,
    };
};
