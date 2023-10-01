import './sideBar.scss' 

export default function SideBar() {
  return (
    <div className='flex-container-vertical'> 
      <div className='imageLin'>
        image
      </div>

      <div className='flex-container-vertical-cont'>
        <div className='flex-container-vertical_element'>
          imageMiner
        </div>

        <div className='flex-container-vertical_element'>
          imageOff
        </div> 
      </div>
    </div>
  )
}
