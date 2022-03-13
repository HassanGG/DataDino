import { UseQueryResult } from "react-query"

import Loading from "common/components/loading"
import Error from "common/components/error"

export const QueryComponent = <T,>({
  query: { data, isSuccess, error, isLoading, isError },
  onData,
}: {
  query: UseQueryResult<T>
  onData: (data: T) => JSX.Element
}) => {
  if (isLoading) return <Loading />
  if (isError) return <Error text={`${error}`} />
  if (isSuccess && data) return onData(data)

  return <p>An unexpected error occurred...</p>
}
