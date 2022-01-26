import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Input, InputNumber } from 'antd';
const { useForm } = Form;

const ModalEdit = ({ dialog, onClose, editProduct }) => {
    const [form] = useForm();
    const { open, name, price, amount, description } = dialog;

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                name,
                price,
                amount,
                description
            });
        }
    }, [open, name, price, amount, description, form]);

    return (
        <>
            <Modal title="Edit Product" visible={open} onCancel={onClose}
                footer={[
                    <Button form="myForm" key="submit" type="primary" htmlType="submit" shape="round">
                        Save Edit
                    </Button>
                ]}>
                <Form
                    id="myForm"
                    name="global_state"
                    layout="vertical"
                    form={form}
                    onFinish={editProduct}
                    initialValues={{
                        name: "",
                        price: 0,
                        amount: 0,
                        description: ""
                    }}
                >
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

                        <Col className="gutter-row" sm={{ span: 24 }}>
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <Input.TextArea maxLength={150} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default ModalEdit;