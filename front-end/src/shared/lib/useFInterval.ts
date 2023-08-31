import { useEffect, useState } from "react"

export const useFInterval = (callback: () => void, delay: number, active: boolean) => {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null)
  useEffect(() => {
    if (active) {
      setTimer(setInterval(callback, delay))
    } else {
      if (timer !== null) {
        clearInterval(timer);
      }
    }
  }, [active])
}
