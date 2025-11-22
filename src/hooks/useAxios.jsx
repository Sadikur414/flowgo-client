import axios from "axios";

const AxiosPublic = axios.create({
    baseURL: "http://localhost:5000",
});


const useAxios = () => {
    return AxiosPublic;
};



export default useAxios;