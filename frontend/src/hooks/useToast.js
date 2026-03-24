import { useState, useCallback } from 'react'

let id = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, severity = 'success') => {
    const tid = ++id
    setToasts(p => [...p, { id: tid, message, severity }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== tid)), 3500)
  }, [])

  return { toasts, showToast }
}
