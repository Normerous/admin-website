import React, { useEffect, useState } from "react";
import { message, Row, Col, Popconfirm } from 'antd';
import { myAPI, formatNumberToComma } from "../functions";
import styled from "styled-components";
import ModalEdit from "../component/ModalEdit";
import Picdefault from "../assets/default.png";
import WithLoading from "../component/WithLoading";

const MyCard = styled.div`
border-radius: 15px;
overflow: hidden;
padding: 16px 16px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
&:hover {
    transform: scale(1.05);
}
.name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre;
  }
  .descriptoin {
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    min-height: 44px;
  }

  .button {
    display: flex;
    justify-content: space-between;
    .edit {
        color: blue;
        cursor: pointer;
    }
    .delete {
        color: red;
        cursor: pointer;
    }
  }
`;

const Product = props => {
    const [dataProduct, setDataProduct] = useState([]);
    const [modalEdit, setModalEdit] = useState({ open: false });
    useEffect(() => {
        const fetchData = async () => {
            props.openLoading();
            const response = await myAPI("/product/get", {}, "GET");
            props.closeLoading();
            if (response.status === 200) {
                setDataProduct(response.data.result);
                message.success(response.data.msg);
            } else {
                message.error(response.data.msg);
            }
        }
        fetchData();
    }, []);

    const deleteProduct = async (value, location) => {
        const response = await myAPI("/product/delete", { _ids: value, location }, "DELETE");
        console.log("response", response);
        if (response.status === 200) {
            setDataProduct(state => state.filter(el => el._id !== value));
            message.success(response.data.msg);
        } else {
            message.error(response.data.msg);
        }
    }

    const editProduct = async (value) => {
        let newData = {
            _id: modalEdit._id,
            name: value.name,
            price: value.price,
            amount: value.amount,
            description: value.description
        };
        props.openLoading();
        setModalEdit({ open: false });
        const response = await myAPI("/product/edit", newData, "POST");
        props.closeLoading();
        if (response.status === 200) {
            setDataProduct(state => state.map(el => el._id === newData._id ? { ...el, ...newData } : el));
            message.success(response.data.msg);
        } else {
            message.error(response.data.msg);
        }
    }
    return <div>
        <Row gutter={[16, 16]}>
            {dataProduct && dataProduct.map((el, i) =>
                <Col key={i} className="gutter-row" xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 4 }}>
                    <MyCard>
                        <img src={el.url || Picdefault} height={150} width={"100%"} onError={({ currentTarget }) => {
                            currentTarget.src = Picdefault;
                        }} alt="img-pro" />

                        <div className="name">
                            {el.name}
                        </div>
                        <div className="descriptoin">
                            {el.description}
                        </div>
                        <div>
                            <span>Price: {formatNumberToComma(el.price)}</span>
                        </div>
                        <div className="price-amont">
                            <span>Amount: {formatNumberToComma(el.amount)}</span>
                        </div>
                        <div className="button">
                            <span className="edit" onClick={() => setModalEdit({ open: true, _id: el._id, name: el.name, price: el.price, amount: el.amount, description: el.description })}>Edit</span>
                            <span className="delete">
                                <Popconfirm
                                    title="Are you sure to delete this product?"
                                    onConfirm={() => deleteProduct(el._id, el.location)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Delete
                                </Popconfirm>
                            </span>
                        </div>
                    </MyCard>
                </Col>)}
        </Row>
        <ModalEdit dialog={modalEdit} onClose={() => setModalEdit({ open: false })} editProduct={editProduct} />
    </div>
}

export default WithLoading(Product);