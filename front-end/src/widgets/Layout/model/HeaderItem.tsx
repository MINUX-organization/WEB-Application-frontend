import { CSSProperties, HTMLProps, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useBoolean, useElementSize, useOnClickOutside } from "usehooks-ts";
import styles from './HeaderItem.module.scss'
import _ from 'lodash'

type HeaderItemProps = HTMLProps<HTMLDivElement> & {
  item: {
    title: string
    links: Array<{
      url: string,
      title: string
    }>
  }
}

export const HeaderItem = (props: HeaderItemProps) => {
  const location = useLocation()
  const isOpen = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  const [dropdownRef, dropdownSize] = useElementSize();
  
  useOnClickOutside(ref, isOpen.setFalse)
  
  return (
    <div
      ref={ref}
      {..._.omit(props, 'item')}
      onClick={isOpen.toggle}
      className={styles['wrapper'] + ' ' +
        (props.className ?? '') + ' ' +
        (props.item.links.some(v => v.url === location.pathname) ? styles['active'] : '') + ' ' +
        (isOpen.value ? styles['open'] : '')
      }
    >
      {props.item.links.length === 1 &&
        <NavLink className={styles['group-label']} to={props.item.links[0].url}><span className={styles['text']}>{props.item.links[0].title}</span></NavLink>
      }
      {props.item.links.length > 1 &&
        <>
          <div className={styles['group-label']}><span className={styles['text']}>{props.item.title}</span></div>
          <div className={styles['dropdown-wrapper']} style={{ "--dropdown-width": `${dropdownSize.width}px`, "--dropdown-height": `${dropdownSize.height}px` } as CSSProperties }>
            <div ref={dropdownRef} className={styles['dropdown']}>
              {props.item.links.map(link => (
                <NavLink key={link.url} className={styles['dropdown-item']} to={link.url}><span className={styles['text']}>{link.title}</span></NavLink>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
}
