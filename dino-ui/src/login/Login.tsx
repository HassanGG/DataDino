import { Link, useNavigate } from "react-router-dom"
import FormCard from "common/components/form-card"
import { Field, Form, Formik } from "formik"
import { UserService } from "common/services/user.service"
import { useContext } from "react"
import { UserContext } from "common/contexts/user.context"
import style from "./Login.module.css"
import { useStyle } from "common/utils/css"
import { LoginForm } from "./Login.types"
import Logo from "common/components/logo"
import Label from "common/components/label"

export const LoginPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues: LoginForm = {
    email: "",
    password: "",
  }

  const onSubmit = async (values: LoginForm) => {
    const { email, password } = values
    const user = await UserService.login({ email, password })
    if (!user) return // TODO: handle failed login

    setUser(user)
    navigate("/")
  }

  const _style = useStyle({
    [style.login]: true,
  })

  const _labelStyle = useStyle({
    [style.label]: true,
    "mb-4": true,
  })

  return (
    <>
      <div className={_style}>
        <FormCard>
          <Logo medium />
          <Label title text="WELCOME BACK" className={_labelStyle} />
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className=" d-flex flex-column align-items-center justify-content-around w-100">
              <div className="form-group mt-3 w-100">
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group mt-3 w-100">
                <Field
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-dark mt-4 mb-3">
                Sign in
              </button>
            </Form>
          </Formik>
          <div className="d-flex">
            <p>Not a member? &nbsp;</p>
            <Link className={style.link} to={"/signup"}>
              Sign up now
            </Link>
          </div>
        </FormCard>
      </div>
    </>
  )
}
