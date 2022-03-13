import { Field, Form, Formik } from "formik"
import { UserService } from "common/services/user.service"
import { useContext } from "react"
import { UserContext } from "common/contexts/user.context"
import { useNavigate } from "react-router-dom"
import style from "./Login.module.css"
import { useStyle } from "common/utils/css"
import { LoginForm } from "./Login.types"

export const LoginPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = async (values: LoginForm) => {
    const user = await UserService.login({ ...values })
    setUser(user)
    if (user) return navigate("/")
  }

  const _style = useStyle({
    [style.login]: true,
    container: true,
  })

  return (
    <>
      <div className={_style}>
        <div className="d-md-flex">
          <div className="form-group w-100">
            <h1>Login</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form>
                <div className="form-group mt-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    className="form-control"
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    required
                  />
                </div>
                <button className="btn btn-success mt-3" type="submit">
                  LOGIN
                </button>
              </Form>
            </Formik>
          </div>
          <div className="w-100 bg-primary">
            <h1>New here?</h1>
            <p>Sign up somewhere</p>
          </div>
        </div>
      </div>
    </>
  )
}
