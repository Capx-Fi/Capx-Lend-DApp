import React from "react";
import { Button } from "antd";
import { SvgIcon } from "../../components/common";
import "./index.less";

const Dashboard = () => {
    return (
        <div>
            Dashbaord
            <Button type="primary">Primary Button</Button>
            <SvgIcon name="close" viewbox="0 0 19 19" />
        </div>
    )
}

export default Dashboard