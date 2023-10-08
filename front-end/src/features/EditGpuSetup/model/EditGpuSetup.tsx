import { FButton, FContainer, FDropdown, FModal, FTextInput } from "@/shared/ui"
import { useQuery } from "react-query"
import { createGpuPreset, editGpuSetup, getFullFlightSheets, getGpuPresets, getGpuSetup } from "@/shared/api"
import { useEffect, useState } from "react"
import { useBoolean } from "usehooks-ts"
import { Button, Select, Spin } from "antd"
import { FNumInput } from "@/shared/ui/FNumInput"
import { toast } from "react-toastify"
import { deleteGpuPreset } from "@/shared/api/deleteGpuPreset"
import { AiOutlineClose } from "react-icons/ai"
import styles from './EditGpuSetup.module.scss'
import _ from 'lodash'

type EditGpuSetupProps = {
  gpuId: number
  gpuSetupId: number
  onCancel?: () => void
  onApply?: () => void
}

export const EditGpuSetup = (props: EditGpuSetupProps) => {
  const { data: flightSheets, isLoading: isLoadingFlightSheets } = useQuery(['load flight sheets'], () => getFullFlightSheets({}), { onError: (e: any) => toast.error(e.message)})
  const { data: gpuSetup, isLoading: isLoadingGpuSetup } = useQuery(['load gpu setup', props.gpuId], async () => (await getGpuSetup({ gpuSetupId: props.gpuSetupId })).data.gpuSetup, { onError: (e: any) => toast.error(e.message)})
  const { data: gpuPresetsData, isLoading: isLoadingPresets, refetch: refetchPresets } = useQuery(['get gpu presets', props.gpuId], () => getGpuPresets({ gpuId: props.gpuId }), { onError: (e: any) => toast.error(e.message)})

  const [coreClock, setCoreClock] = useState<number | null>(null)
  const [memoryClock, setMemoryClock] = useState<number | null>(null)
  const [powerLimit, setPowerLimit] = useState<number | null>(null)
  const [critTemp, setCritTemp] = useState<number | null>(null)
  const [fanSpeed, setFanSpeed] = useState<number | null>(null)
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
      coreClock: coreClock ?? -1,
      critTemp: critTemp ?? -1,
      fanSpeed: fanSpeed ?? -1,
      memoryClock: memoryClock ?? -1,
      powerLimit: powerLimit ?? -1
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
    isSaving.setTrue();
    editGpuSetup({
      id: gpuSetup.id,
      newCoreClock: coreClock ?? -1,
      newCritTemp: critTemp ?? -1,
      newFanSpeed: fanSpeed ?? -1,
      newFlightSheetId: flightSheet?.id ?? null,
      newMemoryClock: memoryClock ?? -1,
      newPowerLimit: powerLimit ?? -1
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
      const flightSheetsData = flightSheets.data.flightSheets
      setCoreClock(gpuSetup.coreClock === -1 ? null : gpuSetup.coreClock)
      setMemoryClock(gpuSetup.memoryClock === -1 ? null : gpuSetup.memoryClock)
      setPowerLimit(gpuSetup.powerLimit === -1 ? null : gpuSetup.powerLimit)
      setCritTemp(gpuSetup.critTemp === -1 ? null : gpuSetup.critTemp)
      setFanSpeed(gpuSetup.fanSpeed === -1 ? null : gpuSetup.fanSpeed)
      setFlightSheet(flightSheetsData.find(v => v.id === gpuSetup.flightSheetId) ?? null)
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
                <div className={styles['value']}><FNumInput value={coreClock} onChange={value => setCoreClock(value)} min={gpuSetup.options.clocks.minimalCore} max={gpuSetup.options.clocks.maximumCore} /></div>
                <div className={styles['unit']}>Mhz</div>
                <div className={styles['label']}>Memory Clock</div>
                <div className={styles['value']}><FNumInput value={memoryClock} onChange={value => setMemoryClock(value)} min={gpuSetup.options.clocks.minimalMemory} max={gpuSetup.options.clocks.maximumMemory} /></div>
                <div className={styles['unit']}>Mhz</div>
                <div className={styles['label']}>Power Limit</div>
                <div className={styles['value']}><FNumInput value={powerLimit} onChange={value => setPowerLimit(value)} min={gpuSetup.options.power.minimal} max={gpuSetup.options.power.maximum} /></div>
                <div className={styles['unit']}>Watt</div>
                <div className={styles['label']}>Critical Temp.</div>
                <div className={styles['value']}><FNumInput value={critTemp} onChange={value => setCritTemp(value)} min={0} max={gpuSetup.options.temperature.maximumCritical} /></div>
                <div className={styles['unit']}>°C</div>
                <div className={styles['label']}>Fan Speed</div>
                <div className={styles['value']}><FNumInput value={fanSpeed} onChange={value => setFanSpeed(value)} min={0} max={100} /></div>
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
