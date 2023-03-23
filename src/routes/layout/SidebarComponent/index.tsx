import { createContext, useContext, useState } from 'react';

import { IconMore, IconFruitWatermelon, IconLayoutSidebarLeftCollapse, IconHome, IconSearch, IconAnalytics, IconFileText, IconLifeRing, IconLightDown, IconSecurity, IconTimer } from '../../../utils/icons';

type ThemeType = 'light' | 'dark';
type ListContextProp = {
    theme: ThemeType;
    isCollapse: boolean;
    setIsCollapse: () => void;
    toggleTheme: () => void;
}

const ListContext = createContext({} as ListContextProp);

function createListContext() {
    const [listContextState, setListContextState] = useState<ListContextProp>({
        theme: "dark",
        isCollapse: false,
        setIsCollapse: () => {
            setListContextState(prev => {
                return { ...prev, isCollapse: !prev.isCollapse }
            })
        },
        toggleTheme: () => {
            setListContextState(prev => {
                return {
                    ...prev,
                    theme: prev.theme == "dark" ? "light": "dark",
                }
            })
        }
    });

    return listContextState;
}

function ListSpaceExpander() {
    return (
        <div className="flex-1" />
    )
}

function ListDivider() {
    const { theme } = useContext(ListContext);

    let sidebar_on_background_color = theme === "dark" ? "border-[var(--sidebar-on-background-color-dark)]" : "border-[var(--sidebar-on-background-color-light)]";

    return (
        <div>
            <hr className={`${sidebar_on_background_color} border-b border-solid h-0 `} />
        </div>
    )
}

function ListInput() {
    const { theme, isCollapse } = useContext(ListContext);

    let collapseClassName =  isCollapse ? ' hidden ': '';

    let sidebar_surface_color = theme === "dark" ? "bg-[var(--sidebar-surface-color-dark)]" : "bg-[var(--sidebar-surface-color-light)]";
    let sidebar_on_surface_color = theme === "dark" ? "text-[var(--sidebar-on-surface-color-dark)]" : "text-[var(--sidebar-on-surface-color-light)]";

    return (
        <div className={` ${!isCollapse && sidebar_surface_color} ${sidebar_on_surface_color} flex items-center h-full w-hull px-2 py-2 rounded-full overflow-hidden`}>
            <i>
                <IconSearch width="auto" height="1.3rem" />
            </i>
            <input type="text" className={` ${sidebar_surface_color} outline-none text-xs w-full px-2 ${collapseClassName} `} placeholder="Search" />
        </div>
    )
}

function ListSection({ title, children }: { title: string, children?: JSX.Element | JSX.Element[] }) {
    const { isCollapse } = useContext(ListContext);

    let collapseClassName =  !isCollapse ? ' text-left px-2 text-xs ': ' text-center text-[0.65rem] ';

    return (
        <div>
            <div className={` font-bold mb-2 ${collapseClassName}`}>{ title }</div>
            { children }
        </div>
    )
}

function ListButton({ onClick = () => {}, children }: { onClick?:() => void, children?: JSX.Element | JSX.Element[] }) {
    const { theme } = useContext(ListContext);

    let sidebar_surface_color_hover = theme === "dark" ? "hover:bg-[var(--sidebar-surface-color-dark)]" : "hover:bg-[var(--sidebar-surface-color-light)]";
    let sidebar_surface_color_hover_border = "hover:rounded";
    let sidebar_on_surface_color_hover = theme === "dark" ? "hover:text-[var(--sidebar-on-surface-color-dark)]" : "hover:text-[var(--sidebar-on-surface-color-light)]";

    return (
        <div className={` ${sidebar_surface_color_hover} ${sidebar_surface_color_hover_border} ${sidebar_on_surface_color_hover} flex justify-start items-center p-2 text-xs`}>
            <button className={`w-full h-full`} onClick={onClick}>
                { children }
            </button>
        </div>
    )
}

function ListItem({ children }: { children?: JSX.Element | JSX.Element[] }) {
    const { theme } = useContext(ListContext);

    let sidebar_on_background_color = theme === "dark" ? "text-[var(--sidebar-on-background-color-dark)]" : "text-[var(--sidebar-on-background-color-light)]";

    return (
        <div className={` ${sidebar_on_background_color} py-2 my-2 text-sm `}>
            { children }
        </div>
    )
}

// Focus on how to position Icon & text
function IconText({ children, buttonText, className }: { children: JSX.Element, buttonText: string, className?: string }) {
    const { isCollapse } = useContext(ListContext);

    let collapseClassName =  isCollapse ? ' hidden ': '';

    return (
        <div className={`${className} flex items-center h-full w-full `}>
            <i>
                { children }
            </i>
            <div className={`pl-2 ${collapseClassName} `}>{ buttonText }</div>
        </div>
    )
}

function List({ width, height, children }: { width?: string, height?: string, children?: JSX.Element | JSX.Element[] }) {
    const { theme } = useContext(ListContext);

    let styles = {
        width: width,
        height: height
    };

    let sidebar_background_color = theme === "dark" ? "bg-[var(--sidebar-background-color-dark)]" : "bg-[var(--sidebar-background-color-light)]";
    let sidebar_on_background_color = theme === "dark" ? "text-[var(--sidebar-on-background-color-dark)]" : "text-[var(--sidebar-on-background-color-light)]";

    return (
        <div className={`flex flex-col p-2 overflow-hidden rounded ${sidebar_background_color} ${sidebar_on_background_color}`} style={styles}>
            { children }
        </div>        
    )
}

export default function SidebarComponent() {
    const listContextState = createListContext();

    const { isCollapse, setIsCollapse, toggleTheme } = listContextState;

    return (
        <ListContext.Provider value={listContextState as ListContextProp}>
            <List width={isCollapse ? "53px" : "250px"} height={"100%"}>
                <ListItem>
                    <IconText buttonText='Logoipsum' className="px-2 [&>div:nth-child(2)]:font-bold">
                        <IconFruitWatermelon width="1.3rem" height={`${isCollapse ? "1.3rem" : "2rem"}`} />
                    </IconText>
                </ListItem>
                <ListItem>
                    <ListButton onClick={setIsCollapse}>
                        <IconText buttonText='Collapse Menu'>
                            <IconLayoutSidebarLeftCollapse width="1.3rem" height="1.3rem" />
                        </IconText>
                    </ListButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                    <ListInput />
                </ListItem>
                <ListItem>
                    <ListSection title="Home">
                        <ListButton>
                            <IconText buttonText='Start'>
                                <IconHome width="1.3rem" height="1.3rem" />
                            </IconText>
                        </ListButton>
                        <ListButton>
                            <IconText buttonText='Analytics'>
                                <IconAnalytics width="1.3rem" height="1.3rem" />
                            </IconText>
                        </ListButton>
                        <ListButton>
                            <IconText buttonText='IconSecurity'>
                                <IconSecurity width="1.3rem" height="1.3rem" />
                            </IconText>
                        </ListButton>
                    </ListSection>
                </ListItem>
                <ListItem>
                    <ListSection title="Reports">
                        <ListButton>
                            <IconText buttonText='Timed Reports'>
                                <IconTimer width="1.3rem" height="1.3rem" />
                            </IconText>
                        </ListButton>
                        <ListButton>
                            <IconText buttonText='Support Center'>
                                <IconLifeRing width="1.3rem" height="1.3rem" />
                            </IconText>
                        </ListButton>
                        <ListButton>
                            <IconText buttonText='Data Reports'>
                                <IconFileText width="1.3rem" height="1.3rem" />
                            </IconText>
                        </ListButton>
                    </ListSection>
                </ListItem>
                <ListItem>
                    <ListSpaceExpander />
                </ListItem>
                <ListItem>
                    <ListButton onClick={toggleTheme}>
                        <IconText buttonText='Switch to light Theme'>
                            <IconLightDown width="1.3rem" height="1.3rem" />
                        </IconText>
                    </ListButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                    <div className="flex items-center h-full w-full p-2">
                        <img src="https://picsum.photos/50/50" width="30" height="30" className="rounded-full" />
                        {!isCollapse && (
                            <>
                                <div className="flex flex-col items-start pl-2 flex-1 w-full">
                                    <span className="text-sm font-medium">Benjamin-Leon Kraft</span>
                                    <span className="text-xs">Product Designer</span>
                                </div>
                                <button>
                                    <i>
                                        <IconMore width="1.3rem" height="1.3rem" />
                                    </i>
                                </button>
                            </>
                        )}
                    </div>
                </ListItem>
            </List>
        </ListContext.Provider>
    )
}