import { createContext, Suspense, useContext, useState } from 'react'

import {
  IconMore,
  IconFruitWatermelon,
  IconLayoutSidebarLeftCollapse,
  IconHome,
  IconSearch,
  IconAnalytics,
  IconFileText,
  IconLifeRing,
  IconLightDown,
  IconSecurity,
  IconTimer
} from '../../utils/icons'

type ThemeType = 'light' | 'dark'
type ListContextProp = {
  theme: ThemeType
  isCollapse: boolean
  iconStyle: React.SVGProps<SVGSVGElement>
  setIsCollapse: () => void
  toggleTheme: () => void
}

const ListContext = createContext({} as ListContextProp)

function createListContext() {
  const [listContextState, setListContextState] = useState<ListContextProp>({
    theme: 'dark',
    isCollapse: false,
    iconStyle: {
      width: '1.3rem',
      height: '1.3rem'
    },
    setIsCollapse: () => {
      setListContextState(prev => {
        return { ...prev, isCollapse: !prev.isCollapse }
      })
    },
    toggleTheme: () => {
      setListContextState(prev => {
        return {
          ...prev,
          theme: prev.theme == 'dark' ? 'light' : 'dark'
        }
      })
    }
  })

  return listContextState
}

function ListSpaceExpander() {
  return <div className="flex-1" />
}

function ListDivider() {
  const { theme } = useContext(ListContext)

  const sidebar_on_background_color = theme === 'dark' ? 'border-[var(--sidebar-on-background-color-dark)]' : 'border-[var(--sidebar-on-background-color-light)]'

  return (
    <div>
      <hr className={`${sidebar_on_background_color} border-b border-solid h-0 `} />
    </div>
  )
}

function ListInput() {
  const { theme, isCollapse, iconStyle } = useContext(ListContext)

  const collapseClassName = isCollapse ? ' hidden ' : ''

  const sidebar_surface_color = theme === 'dark' ? 'bg-[var(--sidebar-surface-color-dark)]' : 'bg-[var(--sidebar-surface-color-light)]'
  const sidebar_on_surface_color = theme === 'dark' ? 'text-[var(--sidebar-on-surface-color-dark)]' : 'text-[var(--sidebar-on-surface-color-light)]'

  return (
    <div className={` ${!isCollapse && sidebar_surface_color} ${sidebar_on_surface_color} flex items-center h-full w-hull px-2 py-2 rounded-full overflow-hidden`}>
      <i>
        <IconSearch {...iconStyle} />
      </i>
      <input type="text" className={` ${sidebar_surface_color} outline-none text-xs w-full px-2 ${collapseClassName} `} placeholder="Search" />
    </div>
  )
}

function ListSection({ title, children }: { title: string; children?: JSX.Element | JSX.Element[] }) {
  const { isCollapse } = useContext(ListContext)

  const collapseClassName = !isCollapse ? ' text-left px-2 text-xs ' : ' text-center text-[0.65rem] '

  return (
    <div>
      <div className={` font-bold mb-2 ${collapseClassName}`}>{title}</div>
      {children}
    </div>
  )
}

function ListButton({ onClick, children }: { onClick?: () => void; children?: JSX.Element | JSX.Element[] }) {
  const { theme } = useContext(ListContext)

  const sidebar_surface_color_hover = theme === 'dark' ? 'hover:bg-[var(--sidebar-surface-color-dark)]' : 'hover:bg-[var(--sidebar-surface-color-light)]'
  const sidebar_surface_color_hover_border = 'hover:rounded'
  const sidebar_on_surface_color_hover = theme === 'dark' ? 'hover:text-[var(--sidebar-on-surface-color-dark)]' : 'hover:text-[var(--sidebar-on-surface-color-light)]'

  return (
    <div className={` ${sidebar_surface_color_hover} ${sidebar_surface_color_hover_border} ${sidebar_on_surface_color_hover} flex justify-start items-center p-2 text-xs`}>
      <button className={`w-full h-full`} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

function ListItem({ children }: { children?: JSX.Element | JSX.Element[] }) {
  const { theme } = useContext(ListContext)

  const sidebar_on_background_color = theme === 'dark' ? 'text-[var(--sidebar-on-background-color-dark)]' : 'text-[var(--sidebar-on-background-color-light)]'

  return <div className={` ${sidebar_on_background_color} py-2 my-2 text-sm `}>{children}</div>
}

// Focus on how to position Icon & text
function IconText({ children, buttonText, className = '' }: { children: JSX.Element; buttonText: string; className?: string }) {
  const { isCollapse } = useContext(ListContext)

  const collapseClassName = isCollapse ? ' hidden ' : ''

  return (
    <div className={`${className} flex items-center h-full w-full `}>
      <i>{children}</i>
      <div className={`pl-2 ${collapseClassName} `}>{buttonText}</div>
    </div>
  )
}

function IconTextButton({ buttonText, onClick, iconComponent }: { buttonText: string; onClick?: () => void; iconComponent: JSX.Element }) {
  return (
    <ListButton onClick={onClick}>
      <IconText buttonText={`${buttonText}`}>{iconComponent}</IconText>
    </ListButton>
  )
}

function List({ width, height, children }: { width?: string; height?: string; children?: JSX.Element | JSX.Element[] }) {
  const { theme } = useContext(ListContext)

  const styles = {
    width: width,
    height: height
  }

  const sidebar_background_color = theme === 'dark' ? 'bg-[var(--sidebar-background-color-dark)]' : 'bg-[var(--sidebar-background-color-light)]'
  const sidebar_on_background_color = theme === 'dark' ? 'text-[var(--sidebar-on-background-color-dark)]' : 'text-[var(--sidebar-on-background-color-light)]'

  return (
    <div className={`flex flex-col p-2 overflow-hidden rounded ${sidebar_background_color} ${sidebar_on_background_color}`} style={styles}>
      {children}
    </div>
  )
}

function SidebarComponent() {
  const listContextState = createListContext()

  const { isCollapse, iconStyle, setIsCollapse, toggleTheme } = listContextState

  return (
    <ListContext.Provider value={listContextState as ListContextProp}>
      <List width={isCollapse ? '53px' : '250px'} height={''}>
        <ListItem>
          <IconText buttonText="Logoipsum" className="px-2 [&>div:nth-child(2)]:font-bold">
            <IconFruitWatermelon {...iconStyle} height={`${isCollapse ? '1.3rem' : '2rem'}`} />
          </IconText>
        </ListItem>
        <ListItem>
          <IconTextButton onClick={setIsCollapse} buttonText="Collapse Menu" iconComponent={<IconLayoutSidebarLeftCollapse {...iconStyle} />} />
        </ListItem>
        <ListDivider />
        <ListItem>
          <ListInput />
        </ListItem>
        <ListItem>
          <ListSection title="Home">
            <IconTextButton buttonText="Start" iconComponent={<IconHome {...iconStyle} />} />
            <IconTextButton buttonText="Analytics" iconComponent={<IconAnalytics {...iconStyle} />} />
            <IconTextButton buttonText="IconSecurity" iconComponent={<IconSecurity {...iconStyle} />} />
          </ListSection>
        </ListItem>
        <ListItem>
          <ListSection title="Reports">
            <IconTextButton buttonText="Timed Reports" iconComponent={<IconTimer {...iconStyle} />} />
            <IconTextButton buttonText="Support Center" iconComponent={<IconLifeRing {...iconStyle} />} />
            <IconTextButton buttonText="Data Reports" iconComponent={<IconFileText {...iconStyle} />} />
          </ListSection>
        </ListItem>
        <ListItem>
          <ListSpaceExpander />
        </ListItem>
        <ListItem>
          <IconTextButton onClick={toggleTheme} buttonText="Switch to light Theme" iconComponent={<IconLightDown {...iconStyle} />} />
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
                    <IconMore {...iconStyle} />
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

export default function SideBar() {
  const [toggleFramerMotion, setToggleFramerMotion] = useState(false)
  const [toggleEditor, setEditor] = useState(false)
  const [toggleDndKit, setToggleDndKit] = useState(false)

  return (
    <div>
      <div className="w-full p-2">List of issues I encounter with library</div>
      <div className="columns-3 text-center mb-2">
        <div>
          <button className="py-2 px-8 w-full bg-green-500 text-white" onClick={() => setEditor(!toggleEditor)}>
            WYSIWYG Editor
          </button>
        </div>
        <div>
          <button className="py-2 px-8 w-full bg-red-500 text-white" onClick={() => setToggleFramerMotion(!toggleFramerMotion)}>
            framer-motion issue
          </button>
        </div>
        <div>
          <button className="py-2 px-8 w-full bg-red-500 text-white" onClick={() => setEditor(!setToggleDndKit)}>
            Dnd-kit Issue
          </button>
        </div>
      </div>
      <div className="flex">
        <div>
          <SidebarComponent />
        </div>
        <div className="flex-1">
          <Suspense fallback={<></>}>
            {toggleFramerMotion && (
              <iframe
                src="https://codesandbox.io/embed/backgroundcolor-in-framer-motion-forked-fij3sd?fontsize=14&hidenavigation=1&theme=dark"
                style={{ width: '100%', height: '100%', border: 0, borderRadius: '4px', overflow: 'hidden' }}
                title="backgroundColor in Framer-motion"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            )}
            {toggleEditor && (
              <iframe
                src="https://lihkg-wysiwyg-editor.surge.sh"
                style={{ width: '100%', height: '100%', border: 0, borderRadius: '4px', overflow: 'hidden' }}
                title="WYSIWYG Editor"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            )}
            {toggleDndKit && (
              <iframe
                src="https://codesandbox.io/embed/dnd-kit-resortable-lots-of-render-issue-ftlh3c?fontsize=14&hidenavigation=1&theme=dark"
                style={{ width: '100%', height: '100%', border: 0, borderRadius: '4px', overflow: 'hidden' }}
                title="Dnd-kit Resortable lots of render issue"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              ></iframe>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
