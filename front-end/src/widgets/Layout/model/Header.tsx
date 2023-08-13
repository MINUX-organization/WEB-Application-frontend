import { HTMLProps } from 'react';
import { HeaderItem } from './HeaderItem';
import { ProfileButton } from './ProfileButton';
import styles from './Header.module.scss'

const linkGroups: Array<Parameters<typeof HeaderItem>[0]['item']> = [
  {
    title: 'Monitoring', // ignored since 'links' consists of one item
    links: [
      { url: '/monitoring', title: 'Monitoring'}
    ]
  },
  {
    title: 'Settings',
    links: [
      { url: '/settings-flight-sheet', title: 'Flight Sheet'},
      { url: '/settings-gpu', title: 'GPU'}
    ]
  },
  {
    title: 'System',
    links: [
      { url: '/system-gpus', title: 'GPUs'},
      { url: '/system-cpu', title: 'CPU'},
      { url: '/system-motherboard', title: 'Motherboard'},
      { url: '/system-ram', title: 'RAM'},
      { url: '/system-storage', title: 'Storage'},
    ]
  },
  {
    title: 'Analytics', // ignored since 'links' consists of one item
    links: [
      { url: '/analytics', title: 'Analytics'},
    ]
  },
]


export const Header = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={props.className + ' ' + styles['wrapper']}>
      <div className={styles['links']}>
        {linkGroups.map(linkGroup => (
          <HeaderItem key={linkGroup.title} item={linkGroup} />
        ))}
      </div>
      <ProfileButton />
    </div>
  )
}
