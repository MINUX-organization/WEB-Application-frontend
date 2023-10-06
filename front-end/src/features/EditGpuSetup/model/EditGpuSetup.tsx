import { FButton, FContainer, FDropdown, FModal, FTextInput } from "@/shared/ui"
import { useQuery } from "react-query"
import { createGpuPreset, editGpuSetup, getFullFlightSheets, getGpuPresets, getGpuSetup } from "@/shared/api"
import { useEffect, useState } from "react"
import { useBoolean } from "usehooks-ts"
import { Button, Spin } from "antd"
import { FNumInput } from "@/shared/ui/FNumInput"
import { toast } from "react-toastify"
import { deleteGpuPreset } from "@/shared/api/deleteGpuPreset"
import { AiOutlineClose } from "react-icons/ai"
import styles from './EditGpuSetup.module.scss'

type EditGpuSetupProps = {
  gpuId: number
  gpuSetupId: number
  onCancel?: () => void
  onApply?: () => void
}

export const EditGpuSetup = (props: EditGpuSetupProps) => {
  const { data: flightSheets, isLoading: isLoadingFlightSheets } = useQuery(['load flight sheets'], () => getFullFlightSheets({}), { onError: (e: any) => toast.error(e.message)})
  const { data: gpuSetup, isLoading: isLoadingGpuSetup } = useQuery(['load gpu setup', props.gpuId], () => getGpuSetup({ gpuSetupId: props.gpuSetupId }), { onError: (e: any) => toast.error(e.message)})
  const { data: gpuPresetsData, isLoading: isLoadingPresets, refetch: refetchPresets } = useQuery(['get gpu presets', props.gpuId], () => getGpuPresets({ gpuId: props.gpuId }), { onError: (e: any) => toast.error(e.message)})

  const [coreClock, setCoreClock] = useState(0)
  const [memoryClock, setMemoryClock] = useState(0)
  const [powerLimit, setPowerLimit] = useState(0)
  const [critTemp, setCritTemp] = useState(0)
  const [fanSpeed, setFanSpeed] = useState(0)
  const [flightSheet, setFlightSheet] = useState<null | Exclude<typeof flightSheets, undefined>['data']['flightSheets'][number]>(null)

  const isOpenSave = useBoolean(false);
  const [presetName, setPresetName] = useState('')
  const isSaving = useBoolean(false);
  const isCreatingNewPreset = useBoolean(false);

  const cancelName = () => {
    isOpenSave.setFalse();
    setPresetName('')
  }

  const savePreset = () => {
    isCreatingNewPreset.setTrue();
    createGpuPreset({
      gpuId: props.gpuId,
      name: presetName,
      coreClock,
      critTemp,
      fanSpeed,
      memoryClock,
      powerLimit
    }).then(res => {
      cancelName()
      refetchPresets();
    }).catch(e => {
      // toast.error(e.message)
    }).finally(() => {
      isCreatingNewPreset.setFalse();
    })
  }

  const handleRemovePreset = (presetId: number) => {
    deleteGpuPreset({ id: presetId }).then(res => {
      refetchPresets();
    }).catch(e => {
      toast.error(e.message)
    })
  }

  const applyPreset = (preset: Exclude<typeof gpuPresetsData, undefined>['data']['gpuPresets'][number]) => {
    setCoreClock(preset.coreClock)
    setMemoryClock(preset.memoryClock)
    setPowerLimit(preset.powerLimit)
    setCritTemp(preset.critTemp)
    setFanSpeed(preset.fanSpeed)
  }

  const applySetup = () => {
    if (gpuSetup === undefined) {
      toast.error('gpu setup is undefined')
      return
    }
    const setup = gpuSetup.data.gpuSetup;
    isSaving.setTrue();
    editGpuSetup({
      id: setup.id,
      newCoreClock: coreClock,
      newCritTemp: critTemp,
      newFanSpeed: fanSpeed,
      newFlightSheetId: flightSheet?.id ?? null,
      newMemoryClock: memoryClock,
      newPowerLimit: powerLimit
    }).then(res => {
      if (props.onApply !== undefined) props.onApply();
    }).catch(e => {
      toast.error(e.message);
    }).finally(() => {
      isSaving.setFalse();
    })
  }

  useEffect(() => {
    if (gpuSetup !== undefined && flightSheets !== undefined) {
      const gpuSetupData = gpuSetup.data.gpuSetup
      const flightSheetsData = flightSheets.data.flightSheets
      setCoreClock(gpuSetupData.coreClock)
      setMemoryClock(gpuSetupData.memoryClock)
      setPowerLimit(gpuSetupData.powerLimit)
      setCritTemp(gpuSetupData.critTemp)
      setFanSpeed(gpuSetupData.fanSpeed)
      setFlightSheet(flightSheetsData.find(v => v.id === gpuSetupData.flightSheetId) ?? null)
    }
  }, [gpuSetup, flightSheets])
  
  return (
    <div className={styles['wrapper']}>
      <FContainer visibility={{ tc: false }} className={styles['setup-box-wrapper']} bodyProps={{ className: styles['setup-box']}} >
        <div className={styles['setup']}>
          {isLoadingGpuSetup && <Spin />}
          {gpuSetup !== undefined && (
            <>
              <div className={styles['label']}>Core Clock</div>
              <div className={styles['value']}><FNumInput value={coreClock} onChange={value => setCoreClock(value)} /></div>
              <div className={styles['unit']}>Mhz</div>
              <div className={styles['label']}>Memory Clock</div>
              <div className={styles['value']}><FNumInput value={memoryClock} onChange={value => setMemoryClock(value)} /></div>
              <div className={styles['unit']}>Mhz</div>
              <div className={styles['label']}>Power Limit</div>
              <div className={styles['value']}><FNumInput value={powerLimit} onChange={value => setPowerLimit(value)} /></div>
              <div className={styles['unit']}>Watt</div>
              <div className={styles['label']}>Critical Temp.</div>
              <div className={styles['value']}><FNumInput value={critTemp} onChange={value => setCritTemp(value)} /></div>
              <div className={styles['unit']}>°C</div>
              <div className={styles['label']}>Fan Speed</div>
              <div className={styles['value']}><FNumInput value={fanSpeed} onChange={value => setFanSpeed(value)} /></div>
              <div className={styles['unit']}>%</div>
              <div className={styles['label']}>Flight Sheet</div>
              <div className={styles['value'] + ' col-span-2'}>
                {/* <Select
                  style={{ width: '100%' }}
                  value={flightSheet === null ? null : {label: flightSheet.name, value: flightSheet.id, data: flightSheet}}
                  loading={isLoadingFlightSheets}
                  allowClear
                  options={flightSheets?.data.flightSheets.map(v => ({ label: v.name, value: v.id, data: v})) ?? []}
                  onChange={(value, option) => {
                    if (value === undefined) {
                      setFlightSheet(null)
                    } else if (!_.isArray(option)) {
                      setFlightSheet(option.data)
                  }}}
                /> */}
                <FDropdown
                  options={flightSheets?.data.flightSheets ?? []}
                  getOptionLabel={(v => v.name)}
                  getOptionValue={v => v.name}
                  loading={isLoadingFlightSheets}
                  value={flightSheet}
                  onChange={value => setFlightSheet(value)}
                />
              </div>
            </>
          )}
        </div>
      </FContainer>
      <FContainer visibility={{ _l: false, tc: false, bc: false }} className={styles['preset-box-wrapper']} bodyProps={{ className: styles['preset-box']}}>
        {/* <GpuPresetList gpuId={props.gpuId} /> */}
        {isLoadingPresets && <Spin />}
        {gpuPresetsData !== undefined && (
          <>
            {gpuPresetsData.data.gpuPresets.length === 0 && (
              <div className="opacity-25">there is no presets</div>
            )}
            {gpuPresetsData.data.gpuPresets.map(item => (
              <div key={item.id} className="flex gap-2 items-center justify-between">
                <Button type="text" className="flex-grow text-2xl flex items-center" onClick={() => applyPreset(item)}>{item.name}</Button>
                <Button onClick={() => handleRemovePreset(item.id)} type="text" className="flex items-center justify-center" icon={<AiOutlineClose />}/>
              </div>
            ))}
          </>
        )}
      </FContainer>
      <div className={styles['buttons']}>
        <FButton severity="good" onClick={isOpenSave.setTrue}>Save Preset</FButton>
        <FButton severity="good" onClick={applySetup} loading={isSaving.value}>Apply</FButton>
      </div>
      <div />
      <div className="flex justify-end">
        <FButton severity="bad" onClick={props.onCancel}>Cancel</FButton>
      </div>
      <FModal open={isOpenSave.value} onClose={isOpenSave.setFalse} title="Set name for preset" bodyProps={{ className: 'w-full' }} >
        <FContainer className="flex w-full" bodyProps={{ style: { width: '100%', padding: '20px' }}}>
          <div>Name</div>
          <FTextInput value={presetName} onChange={value => setPresetName(value)} />
        </FContainer>
        <div className="mt-4 flex justify-between">
          <FButton severity="bad" onClick={cancelName}>Cancel</FButton>
          <FButton severity="good" onClick={savePreset} loading={isCreatingNewPreset.value}>Save</FButton>
        </div>
      </FModal>
    </div>
  )
}
