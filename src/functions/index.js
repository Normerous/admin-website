import axios from "axios";
const BASE_URL =  process.env.REACT_APP_ENV === "DEV" ? "http://localhost:8080": "https://ecommerceadmin.herokuapp.com";
export const myAPI = async (path = "", data = {}, method = "GET") => {
    const response = await axios({
        url: path,
        baseURL: BASE_URL,
        data: data,
        method: method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
        validateStatus: () => true
    }).then(res => res);
    return response;
};

export const formatNumberToComma = (number) => {
    let n = parseFloat(number).toFixed(2);
    let withCommas = Number(n).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return withCommas;
}