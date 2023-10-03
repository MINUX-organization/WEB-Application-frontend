import { NavLink } from 'react-router-dom' 

type NavigateLinkProps = {
  route: string,
  cancel?: boolean,
  classActive: string, 
  notActive?: string,
  text: string
}

export default function NavigateLink({route, cancel, classActive, notActive = " ", text}: NavigateLinkProps) {
  const handleCancel = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault(); 
  };

  if (cancel) {
    return (
      <NavLink to={route} onClick={handleCancel} className={({isActive}) => isActive ? classActive  : notActive}> 
        {text}
      </NavLink>
    )
  }
  return (
    <NavLink to={route} className={({isActive}) => isActive ? classActive  : ''}>
      {text}
    </NavLink>
  )
}