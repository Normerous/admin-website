import React, { useState } from "react";
import { Row, Col, Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { myAPI } from "../functions";
import styled from "styled-components";
import WithLoading from "../component/WithLoading";

const { useForm } = Form;

const MyCard = styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 15px;
overflow: hidden;
padding: 16px 16px;
`;

const AddProductPage = props => {

    const [form] = useForm();
    const [fileList, setFileList] = useState(null);

    const propsUpload = {
        onRemove: file => {
            console.log("onRemove", file);
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(null)
        },
        beforeUpload: file => {
            if (file.type === "image/png" && file.size <= 2097152) {
                setFileList([file]);
                return false;
            } else if (file.size > 2097152) {
                message.error(`${file.name} is biggest.`);
                return Upload.LIST_IGNORE;
            } else {
                message.error(`${file.name} is not a png file`);
                return Upload.LIST_IGNORE;
            }

        },
        fileList
    };

    const getFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            console.log("dff", e);
            return e;
        }
        return e && e.fileList;
    };

    const onFinish = async e => {
        let formData = new FormData();
        let file = fileList[0];
        formData.append("file", file);
        formData.append("name", e.name);
        formData.append("price", e.price);
        formData.append("amount", e.amount);
        formData.append("description", e.description);
        props.openLoading();
        const response = await myAPI("/product/add", formData, "POST");
        props.closeLoading();
        if (response.status === 200) {
            form.resetFields();
            setFileList(null)
            message.success(response.data.msg);
        } else {
            message.error(response.data.msg);
        }
    }
    return <>
        <Form
            name="global_state"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{
                name: "",
                price: 0,
                amount: 0,
                image: null,
                description: ""
            }}
        >
            <MyCard>
                <Row gutter={[16, 0]}>
                    <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 24 }}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Name is required' }]}
                        >
                            <Input autoComplete="off" maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Price is required' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                max={10000000}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Amount is required' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                max={1000000}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 24 }}>
                        <Form.Item
                            label="Image"
                            name='image'
                            getValueFromEvent={getFile}
                            rules={[{ required: true, message: 'Image is required' }]}>
                            <Upload listType="picture" maxCount={1} {...propsUpload}>
                                <Button>Select Image (.png)</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" sm={{ span: 24 }}>
                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <Input.TextArea maxLength={150} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" sm={{ span: 24 }} align="middle">
                        <Button htmlType="submit" type="primary" shape="round">Save</Button>
                    </Col>

                </Row>
            </MyCard>
        </Form>
    </>
}

export default WithLoading(AddProductPage);