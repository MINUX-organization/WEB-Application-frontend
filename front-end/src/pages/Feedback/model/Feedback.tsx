import { FButton, FDatePicker, FQuadContainer, FTextInput } from "@/shared/ui";
import { HTMLProps } from "react";
import styles from './Feedback.module.scss'
import { useStateObj } from "@/shared/lib";
import dayjs from "dayjs";

export const Feedback = (props: HTMLProps<HTMLDivElement>) => {
  const state = {
    title: useStateObj(''),
    message: useStateObj(''),
    period: useStateObj<null | [null | dayjs.Dayjs, null | dayjs.Dayjs]>([dayjs(), dayjs()])
  }
  const action = {
    reset: () => {
      state.title.setValue('');
      state.message.setValue('');
      state.period.setValue([null, null])
    },
    send: () => {
      alert('not implemented')
    }
  }
  return (
    <div {...props} className={(props.className ?? '') + ' ' + styles['wrapper']}>
      <FQuadContainer filled className={styles['main-box-wrapper']} bodyProps={{ className: styles['main-box'] }}>
        <span>Send us Your problems or thoughts. We'll listen to you!</span>
        <FTextInput value={state.title.value} onChange={state.title.setValue} multiline minRows={3} maxRows={3} title="Title" />
        <FTextInput value={state.message.value} onChange={state.message.setValue}  multiline minRows={8} maxRows={13} title="Message"/>
        <FDatePicker value={state.period.value} onChange={state.period.setValue} />
        <div className={styles['actions']}>
          <FButton severity="bad" onClick={action.reset}>Clear</FButton>
          <FButton severity="good" onClick={action.send}>Send</FButton>
        </div>
      </FQuadContainer>
    </div>
  )
}
