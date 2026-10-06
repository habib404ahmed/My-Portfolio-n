import { useEffect, useState } from 'react'

export type DeviceClass = 'low' | 'medium' | 'high'

export function useDeviceCapability(): DeviceClass {
  const [capability, setCapability] = useState<DeviceClass>('high')

  useEffect(() => {
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 2

    // Check device memory (Chrome only)
    const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4

    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')

    if (!gl) {
      setCapability('low')
      return
    }

    if (isMobile || cores <= 2 || memory <= 2) {
      setCapability('low')
    } else if (cores <= 4 || memory <= 4) {
      setCapability('medium')
    } else {
      setCapability('high')
    }
  }, [])

  return capability
}
