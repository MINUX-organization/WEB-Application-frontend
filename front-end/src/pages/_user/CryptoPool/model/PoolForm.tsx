import { HTMLProps } from "react"; 
import { FButton, FTextInput } from "@shared/ui";
import { useStateObj } from "@shared/lib";
import _ from "lodash";
import styles from './PoolForm.module.scss'
import { sendRequestApi } from "@shared/api";
import { Method } from "axios";

export const PoolForm = (props: HTMLProps<HTMLDivElement>) => { 
  const state = {
    coinName: useStateObj(''),
    poolsDomen: useStateObj(''),
    poolsPort: useStateObj('')
  } 

  const handleReset = () => {
    _.map(state, item => {
        item.setValue('')
    })
  }

  const handleAdd = async () => {
    const poolData = {
      coinName: state.coinName.value,
      poolsDomen: state.poolsDomen.value,
      poolsPort: state.poolsPort.value,
    }
    
    const requestData = {
      url: 'http://localhost:8200/api/create/pool',
      method: 'POST' as Method,
      data: poolData,
      successMsg: 'Pool successfully added!',
    }

    sendRequestApi(requestData);
  } 
  return (
    <div {...props} className={styles['wrapper']}> 
      <p className={styles['text']}>Add pool</p> 
      <div className={styles['grid-container']}>
        {/* < -- TODO: dropdown ui-- >*/}
        <div className={styles['flex-container']}> 
            <div className={styles['text-title']}>Coin Name</div>
            <div className={styles['input']}>
                <FTextInput value={state.coinName.value} 
                onChange={state.coinName.setValue} placeholder="Coin Name"/>  
            </div>
        </div>

        <div className={styles['flex-container']}> 
            <div className={styles['text-title']}>Pool’s domen</div>
            <div className={styles['input']}>
                <FTextInput value={state.poolsDomen.value} 
                onChange={state.poolsDomen.setValue} placeholder="Example: 2miner.com"/>  
            </div>
        </div>

        <div className={styles['flex-container']}> 
            <div className={styles['text-title']}>Pool’s port</div>
            <div className={styles['input']}>
                <FTextInput value={state.poolsPort.value} 
                onChange={state.poolsPort.setValue} placeholder="Example: 4500"/>  
            </div>
        </div> 

        <div className={styles['button-container']}>
          <FButton severity={"bad"} className={styles['button']} onClick={handleReset}>
              <p>Reset</p>
          </FButton> 
          <FButton severity={"good"} className={styles['button']} onClick={handleAdd}>
              <p>Add</p>
          </FButton> 
        </div>
      </div>
    </div>
  )
}
