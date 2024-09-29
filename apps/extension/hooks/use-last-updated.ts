export const useLastUpdated = () => {
  const storageApi = storage.defineItem<string>('local:lastUpdated', {
    fallback: new Date(0).toISOString(),
  })

  return useMemo(() => {
    return {
      async set(value: Date) {
        return await storageApi.setValue(value.toISOString())
      },
      async get(): Promise<Date> {
        return new Date(await storageApi.getValue())
      },
    }
  }, [storageApi])
}
