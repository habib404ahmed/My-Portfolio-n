import { useSyncExternalStore } from 'react'
import type { TechDomain, TechItem } from '@/data/techStack'

export interface TechUniverseState {
  hoveredCategory: string | null
  activeCategory: TechDomain | null
  activeTech: TechItem | null
  pointer: { x: number; y: number }
  isDwell: boolean
  activationTransition: number // 0 -> 1 progress for category open
}

let state: TechUniverseState = {
  hoveredCategory: null,
  activeCategory: null,
  activeTech: null,
  pointer: { x: 0, y: 0 },
  isDwell: false,
  activationTransition: 0,
}

const listeners = new Set<() => void>()
let dwellTimeout: ReturnType<typeof setTimeout> | null = null

function emit() {
  listeners.forEach((listener) => listener())
}

export const techUniverseStore = {
  getState: (): TechUniverseState => state,

  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  setHoveredCategory: (id: string | null) => {
    if (state.hoveredCategory === id) return
    state = { ...state, hoveredCategory: id }
    emit()
  },

  setActiveCategory: (domain: TechDomain | null) => {
    state = {
      ...state,
      activeCategory: domain,
      activeTech: null,
      activationTransition: domain ? 1 : 0,
    }
    emit()
  },

  setActiveTech: (tech: TechItem | null) => {
    state = { ...state, activeTech: tech }
    emit()
  },

  updatePointer: (x: number, y: number) => {
    state = { ...state, pointer: { x, y }, isDwell: false }
    emit()

    if (dwellTimeout) clearTimeout(dwellTimeout)
    dwellTimeout = setTimeout(() => {
      state = { ...state, isDwell: true }
      emit()
    }, 650)
  },
}

export function useTechUniverseStore(): TechUniverseState {
  return useSyncExternalStore(
    techUniverseStore.subscribe,
    techUniverseStore.getState,
    techUniverseStore.getState
  )
}
