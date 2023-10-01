import React, { useState, ReactNode } from 'react';
import './hoverList.scss';
import { NavigateLink } from '@/shared/components';

interface Option {
  id: number;
  text: string;
  url: string
}

interface Props {
  options?: Option[];
  children: ReactNode;
}

const HoverList: React.FC<Props> = ({ options, children }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className="hover-list-container"
      onClick={() => setShowOptions(!showOptions)} 
      onMouseLeave={() => setShowOptions(false)}
    >
      {children}
      {showOptions && (
        <ul className="hover-list-options">
          {options && options.map((option) => (
            <li key={option.id} className='hover-list-item'>
                <NavigateLink route={option.url} 
                classActive='class-active' 
                text={option.text}/> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HoverList;