import Page from "common/components/page"
import { DatasetService } from "common/services/dataset.service"
import { Field, Form, Formik } from "formik"
import { useContext, useState } from "react"
import { useQueries } from "react-query"
import { CheckoutForm } from "./Checkout.types"
import QueriesComponent from "common/components/queries-component"
import { DatasetMeta } from "common/data/dataset"
import aveta from "aveta"
import { UserContext } from "common/contexts/user.context"
import { useNavigate } from "react-router-dom"
import { OrderService } from "common/services/order.service"
import Loading from "common/components/loading"

export const CheckoutPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { user, cart, setCart } = useContext(UserContext)
  const datasetQueries = useQueries(
    cart.map(({ datasetId }) => {
      return {
        queryKey: ["dataset", datasetId],
        queryFn: () => DatasetService.get({ id: datasetId }),
      }
    }),
  )

  const toLogin = () => navigate("/login")

  const computeTotalPrice = (datasets: DatasetMeta[]): number => {
    return datasets.reduce((acc, { id, datapointPrice }) => {
      const cartItem = cart.find(({ datasetId }) => datasetId === id)
      const datapointCount = cartItem?.datapointCount ?? 0
      return acc + datapointCount * datapointPrice
    }, 0)
  }

  const onData = (datasets: DatasetMeta[]) => {
    const cartSummaryRows = datasets.map(dataset => {
      const cartItem = cart.find(({ datasetId }) => datasetId === dataset.id)
      if (!cartItem)
        return <div>Could not find cart item with dataset ID: {dataset.id}</div>

      const price = (cartItem.datapointCount * dataset.datapointPrice).toFixed(
        2,
      )

      return (
        <>
          <p className="row align-items-end gap-3">
            <small className="h6 col text-muted">{dataset.name}:</small>
            <div className="h4 col">${price}</div>
            <div className="h5 col">{aveta(cartItem.datapointCount)}</div>
          </p>
        </>
      )
    })

    const totalPrice = computeTotalPrice(datasets).toFixed(2)
    const totalDatapoints = cart.reduce(
      (acc, { datapointCount }) => acc + datapointCount,
      0,
    )

    return (
      <>
        <div className="card w-50">
          <div className="row g-0">
            <div className="col-md-7 card-body">
              <h3 className="card-title mb-5">Order Summary</h3>
              {cartSummaryRows}
              <p className="row align-items-end border-top pt-3 mt-2">
                <small className="h5 text-muted col">Total:</small>
                <div className="h3 col">${totalPrice}</div>
                <div className="h4 col">{aveta(totalDatapoints)}</div>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  const initialValues: CheckoutForm = {
    name: "",
    cardNumber: "",
    cvc: "",
  }

  const onSubmit = async (values: CheckoutForm) => {
    setIsLoading(true)

    if (!user) throw "Should not be able to checkout with guest user."

    const datasets = await DatasetService.getAll()
    const totalPrice = computeTotalPrice(datasets)

    await OrderService.post({
      userId: user.id,
      items: cart,
      total: totalPrice,
      purchasedAt: Date.now(),
    })

    setCart([])

    setIsLoading(false)

    navigate("/profile")
  }

  return (
    <>
      <Page showBar>
        <div>
          {!user ? (
            <div className="d-flex flex-column w-25">
              <div className="h3 mb-4">You must be signed in to checkout.</div>
              <div className="btn btn-dark" onClick={toLogin}>
                Login
              </div>
            </div>
          ) : (
            <div className="d-flex gap-5">
              <div>
                <div className="h1 mb-5">Checkout</div>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  <Form className="d-flex flex-column align-items-start gap-3 w-75">
                    <Field
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      required
                    />
                    <div className="d-flex gap-2">
                      <Field
                        className="form-control"
                        name="cardNumber"
                        type="number"
                        placeholder="Card Number"
                        required
                      />
                      <Field
                        className="form-control w-50"
                        name="cvc"
                        type="number"
                        placeholder="CVC"
                        required
                      />
                    </div>

                    {isLoading ? (
                      <div className="fs-6">
                        <Loading />
                      </div>
                    ) : (
                      <button className="btn btn-dark mt-3" type="submit">
                        Purchase
                      </button>
                    )}
                  </Form>
                </Formik>
              </div>
              <QueriesComponent queries={datasetQueries} onData={onData} />
            </div>
          )}
        </div>
      </Page>
    </>
  )
}
