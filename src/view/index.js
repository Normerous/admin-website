import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import Product from "./Product";
import Layout from "../component/Layout";
import { useSelector, useDispatch } from 'react-redux';
import { myAPI } from "../functions";
import { setDetailFromLogin } from "../redux/actions";
import { Loading } from "../component/styles";
import ErrorPage from "./ErrorPage";
import DashboardPage from "./DashboardPage";

const Main = () => {
    const [loading, setLoading] = useState(false);
    const { email } = useSelector(state => state);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            const fetch = async () => {
                const response = await myAPI("/auth/checkToken", {}, "POST");
                console.log("response", response);
                setLoading(false);
                if (response.status === 200) {
                    dispatch(setDetailFromLogin({ email: response.data.user.email, token: localStorage.getItem("token") }));
                } else {
                    localStorage.clear();
                    dispatch(setDetailFromLogin({ email: null, token: null }));
                    navigate("/");
                }
            }
            setLoading(true);
            fetch();
        }

    }, [email, dispatch, navigate]);
    return loading ? <Loading /> :
        <Layout>
            <Routes>
                {email ? <>
                    <Route path="/" element={<Navigate replace to="/app/product" />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="error" element={<ErrorPage />} />
                    <Route path="/*" element={<Navigate replace to="/app/error" />} />
                </> : null}
            </Routes>
        </Layout>
}

export default Main;