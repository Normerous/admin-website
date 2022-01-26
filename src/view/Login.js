import React from "react";
import styled from "styled-components";
import { Form, Input, Space, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
    useNavigate
} from "react-router-dom";
import {
    setDetailFromLogin
} from "../redux/actions";
import { useDispatch } from 'react-redux';
import WithLoading from "../component/WithLoading";
import { myAPI } from "../functions";
const Card = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
padding: 15px 50px;
width: 40%;
margin-right: auto;
margin-left: auto;
border-radius: 15px;
background: white;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
text-align: center;
height: 50%;
max-width: 550px;

@media (max-width: 768px) {
max-width: 540px;
width: 70%;
}

@media (max-width: 576px) {
max-width: 400px;
width: 80%;
}`;

const Login = props => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const submitLogin = async (value) => {
        const response = await myAPI("/auth/login", {
            email: value.email,
            password: value.password
        }, "POST");
        console.log("response", response);
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            dispatch(setDetailFromLogin({ email: response.data.user.email, token: response.data.token }));
            message.success(response.data.msg);
            navigate("/app/product");
        } else  message.error(response.data.msg);
    }
    return <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Card>
            <Space direction="vertical" style={{ textAlign: "left" }}>
                <h1>ADMIN-WEBSITE</h1>
                <Form onFinish={submitLogin}
                    initialValues={{
                        email: "k.warayout@gmail.com",
                        password: "12345678"
                    }}>
                    <Form.Item
                        id="form-email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email is required!' },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }
                        ]}
                    >
                        <Input
                            id="email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="E-mail"
                            type={"email"}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Password is required!'
                            },
                            {
                                min: 8,
                                max: 16,
                                message: "Enter a password of 8-16 characters."
                            }
                        ]}>
                        <Input.Password
                            id="pasword"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                            type={"password"}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form>
            </Space>
        </Card>
    </div>
}
export default WithLoading(Login);