import {MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import React from "react";

const createMenuProps = (locations: string[], location: string, predomain: string = '') => {
    // Создать итемы для меню
    let defaultSelectedKeys: string[] = ['0']
    const items: MenuProps['items'] = [
        ...locations.map((loc, index) => {
            if (location === loc) {
                defaultSelectedKeys = [`${index}`]
            }
            return (
                {
                    label: (
                        <NavLink className={'item'} to={predomain + loc}>{loc === '/' && 'Posts'}{(loc.substring(1,2).toUpperCase() + loc.substring(2))}</NavLink>
                    ),
                    key: index,
                    style: {borderRadius: '8px'}
                }
            )
        })
    ]
    return {items, defaultSelectedKeys}
}

export default createMenuProps

