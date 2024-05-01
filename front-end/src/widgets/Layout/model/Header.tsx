import { HTMLProps } from 'react';
import { HeaderItem } from './HeaderItem';
import { ProfileButton } from './ProfileButton';
import styles from './Header.module.scss'
import { useMediaQuery } from 'usehooks-ts';
import { FButton } from '@/shared/ui';

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
  const above800 = useMediaQuery('(min-width: 800px)');

  const handleRedirectToPort = (port: number) => {
    window.open(window.location.origin.replace(/(?<=:)[^:]*$/, port.toString()));
  }

  return (
    <>
      {above800 &&
        <div {...props} className={props.className + ' ' + styles['header']}>
          <div className={styles['links']}>
            {linkGroups.map(linkGroup => (
              <HeaderItem key={linkGroup.title} item={linkGroup} />
            ))}
          </div>
          <div className={styles['header__extra-buttons']}>
            <button
              className={styles['header__extra-buttons-button']}
              onClick={() => handleRedirectToPort(2222)}
            >
              Web Terminal
            </button>
            <button
              className={styles['header__extra-buttons-button']}
              onClick={() => handleRedirectToPort(3001)}
            >
              Chia Dashboard
            </button>
          </div>
          <ProfileButton />
        </div>
      }
    </>
  )
}
