import React from "react";
import { SvgIcon } from "../../common";
import { Button, Select } from "antd";
import "./index.less"

const { Option } = Select;

const NavigationBar = () => {
    return (
        <>
            <div className="logo">
                <SvgIcon name="logo" viewbox="0 0 146.841 28.736" />
            </div>
            <div className="top-bar-right">
                <div className="notifications">
                    <div className="bell-icon">
                        <span></span>
                        <SvgIcon name="bell" viewbox="0 0 20.03 21.997" />
                    </div>
                </div>
                <Select
                    className="coin-select"
                    dropdownClassName="coin-select-dropdown"
                    defaultActiveFirstOption={true}
                    suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                    >
                        <Option key="1" value="1">
                            <div className="select-inner">
                                <div className="svg-icon">
                                    <div className="svg-icon-inner">
                                        <SvgIcon name="polygon" viewbox="0 0 38.3 33.7" />
                                    </div>
                                </div>
                                <div className="name">Polygon</div>
                            </div>
                        </Option>
                    </Select>
                <div className="wallet-address">
                    <Button icon={<SvgIcon name="logout" viewbox="0 0 15.501 15.383" />}>
                        0x98......102
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NavigationBar