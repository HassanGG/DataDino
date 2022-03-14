import Page from "common/components/page"
import QueryComponent from "common/components/query-component"
import { UserContext } from "common/contexts/user.context"
import { Order } from "common/data/order"
import { OrderService } from "common/services/order.service"
import { useContext } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const query = useQuery(["order", user?.id], () => {
    if (!user) return Promise.resolve([])
    return OrderService.getAll({ customerId: user.id })
  })

  const signOut = () => {
    setUser(null)
    navigate("/")
  }

  const onData = (orders: Order[]) => {
    const orderRows = orders.map(order => {
      const itemRows = order.items.map(item => {
        return (
          <>
            <div>{item.datapointCount}</div>
            <div>{item.datasetId}</div>
          </>
        )
      })
      return (
        <>
          <div>{order.state}</div>
          <div>{order.customerId}</div>
          <div>{order.id}</div>
          <div>{order.purchasedAt}</div>
          <div>{order.total}</div>
          <div className="h4">Items:</div>
          {itemRows}
        </>
      )
    })

    return (
      <>
        <div className="h3">Orders</div>
        {orderRows}
      </>
    )
  }

  return (
    <Page>
      <button type="button" className="btn btn-dark" onClick={signOut}>
        Sign out
      </button>
      <QueryComponent query={query} onData={onData} />
    </Page>
  )
}
