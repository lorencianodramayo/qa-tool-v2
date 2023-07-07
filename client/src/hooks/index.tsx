import {useEffect, useRef, DependencyList} from 'react'
export const useOnUnmount = (fn: () => void) => {
  const fnRef = useRef<() => void>()
  fnRef.current = fn
  useEffect(() => {
    return () => {
      if (fnRef.current) {
        fnRef.current()
      }
    }
  }, [])
}
export const useOnMount = (fn: () => void) => {
  const fnRef = useRef<boolean>(false)
  useEffect(() => {
    if (!fnRef.current) {
      fn()
      fnRef.current = true
    }
  }, [fn])
}
export const useOnMountv2 = (fn: () => void, dependencies: DependencyList): void => {
  useEffect(() => {
    fn()
  }, dependencies)
}
