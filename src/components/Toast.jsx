import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const Ctx = createContext(() => {})
export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const push = useCallback((text, type = 'ok') => {
    const id = Math.random()
    setToasts((t) => [...t, { id, text, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500)
  }, [])
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-44 z-[60] flex flex-col items-center gap-2 px-4 md:bottom-8" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="animate-fade-up flex max-w-md items-center gap-2 rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-2xl">
            {t.type === 'error' ? <AlertCircle className="size-4 shrink-0 text-red-300" /> : <CheckCircle2 className="size-4 shrink-0 text-emerald-300" />}
            {t.text}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
