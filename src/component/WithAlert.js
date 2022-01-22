import React from "react";
import { Modal } from 'antd';

const WithAlert = WithAlert => props => {
    const error = msg => {
        Modal.error({
            title: 'Alert',
            content: msg,
        });
    }

    const success = msg => {
        let secondsToGo = 2;
        const modal = Modal.success({
          content: msg,
        });
        setTimeout(() => {
          modal.destroy();
        }, secondsToGo * 1000);
    }

    return <WithAlert {...props} alertSuccess={success} alertError={error} />
}
export default WithAlert;