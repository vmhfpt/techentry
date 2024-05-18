import type { MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import UseLink from './UseLink';
type MenuItem = Required<MenuProps>['items'][number];

type MyMenu = {
    label: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode,
    children?: MyMenu[],
    type?: string,
    link?: string
}

type MyItemSidenav = {
    components: MyMenu[]
}

export default function UseSidenav({components}: MyItemSidenav) {

    const { pathname } = useLocation()
    const [link] = useState(pathname)

    const menu: MyMenu[] = components
    const active: Array<React.Key> = []

    let dem = 0;

    const compileMenu = (element: MyMenu, keyActive: Array<React.Key> = []): MyMenu => {    
        
        dem++

        const currentElement: MyMenu = { ...element, key: dem };
        currentElement.icon = currentElement.icon ? (<div className='submenu-svg'>{currentElement.icon}</div>) :  currentElement.icon 
        

        if(currentElement.link && currentElement.link != undefined){
            
            currentElement.label = (
                <UseLink to={currentElement.link}>
                    {currentElement.label}
                </UseLink>
            )

            if(keyActive && currentElement.link == link){
                if(currentElement.key != undefined){
                    keyActive.push(currentElement.key)
                    active.push(...keyActive)
                }
            }

        }else{

            if(currentElement.key != undefined){
                keyActive.push(currentElement.key)
            }
            
        }

        if (element.children !== undefined && element.children.length > 0) {
            currentElement.children = element.children.map(child => {
                
                return compileMenu(child, keyActive)
            }).flat();
        }
    
        return currentElement;
    }

    return {
        getMenu: () => {
            return menu.map(({key, label, children, icon, type, link }) => {
                return compileMenu({
                    key,
                    label,
                    children,
                    icon,
                    type,
                    link
                })
            }) as MenuItem[];
            
        },
        getKeyActive: () => {
            return active
        }
    }
}
