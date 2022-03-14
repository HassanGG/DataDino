import { UseQueryResult } from "react-query"

import Loading from "common/components/loading"
import Error from "common/components/error"

export const QueriesComponent = <T,>({
  queries,
  onData,
}: {
  queries: UseQueryResult<T>[]
  onData: (data: T[]) => JSX.Element
}) => {
  const isLoading = queries.some(({ isLoading }) => isLoading)
  const isError = queries.some(({ isError }) => isError)
  const isSuccess = queries.every(({ isSuccess }) => isSuccess)
  const data = queries.map(({ data }) => data as T)
  const error = queries.reduce(
    (acc, cur) => acc + cur.error + "|",
    "Error(s): ",
  )

  if (isLoading) return <Loading />
  if (isError) return <Error text={error} />
  if (isSuccess) return onData(data)

  return <p>An unexpected error occurred...</p>
}
