import React, { useState } from "react";
import { Loading } from "./styles";

export default WithLoading => props => {

  const [loading, setLoading] = useState(false);

  const openLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);
  return <>
    <WithLoading {...props} loading={loading} openLoading={openLoading} closeLoading={closeLoading} />
    {loading ? <Loading /> : null}
  </>
};