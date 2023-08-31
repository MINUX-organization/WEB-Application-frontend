import { HTMLProps } from "react";
import styles from './CryptoForm.module.scss'
import { FButton, FTextInput } from "@shared/ui";
import { useStateObj } from "@shared/lib";
import _ from "lodash"; 
import { sendRequestApi } from "@shared/api";
import { Method } from "axios";

export const CryptoForm = (props: HTMLProps<HTMLDivElement>) => {
    const state = {
        shortName: useStateObj(''),
        fullName: useStateObj(''),
        algorithm: useStateObj('')
    } 

    const handleReset = () => {
        _.map(state, item => {
            item.setValue('')
        })
    }

    const handleAdd = async () => {
        const cryptoData = {
            shortName: state.shortName.value,
            fullName: state.fullName.value,
            algorithm: state.algorithm.value,
          }
          
          const requestData = {
            url: 'http://localhost:8200/api/create/pool',
            method: 'POST' as Method,
            data: cryptoData,
            successMsg: 'Pool successfully added!',
          }
      
          sendRequestApi(requestData);
    }

  return (
    <div {...props} className={styles['wrapper']}>
      <p className={styles['text']}>Add cryptocoin</p> 
      <div className={styles['grid-container']}> 
        <div className={styles['flex-container']}> 
            <div className={styles['text-title']}>Short name</div>
            <div className={styles['input']}>
                <FTextInput value={state.shortName.value} 
                onChange={state.shortName.setValue} placeholder="Example: BTC"/>  
            </div>
        </div>

        <div className={styles['flex-container']}> 
            <div className={styles['text-title']}>Full Name</div>
            <div className={styles['input']}>
                <FTextInput value={state.fullName.value} 
                onChange={state.fullName.setValue} placeholder="Example: Bitcoin"/>  
            </div>
        </div>

        {/* < --TODO: dropdown ui -- > */}
        <div className={styles['flex-container']}> 
            <div className={styles['text-title']}>Algorithm</div>
            <div className={styles['input']}>
                <FTextInput value={state.algorithm.value} 
                onChange={state.algorithm.setValue} 
                placeholder="Mining Algorithm"/>  
            </div>
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
  )
}
