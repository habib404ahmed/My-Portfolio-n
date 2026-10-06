import { useEffect, useRef } from 'react'

export function useScrollProgress(callback: (progress: number) => void) {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0
      callback(Math.min(1, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [callback])
}
