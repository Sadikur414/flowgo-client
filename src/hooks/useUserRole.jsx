import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const email = user?.email;

    const { data, isLoading: roleLoading, isError, refetch } = useQuery({
        queryKey: ["user-role", email],
        queryFn: async () => {
            if (!email) return null;
            const res = await axiosSecure.get(`/users/role/${email}`);
            return res.data.role;
        },
        enabled: !!email,
        staleTime: 5 * 60 * 1000,
    });

    return {
        role: data,
        roleLoading,
        isError,
        refetch,
    };
};

export default useUserRole;
