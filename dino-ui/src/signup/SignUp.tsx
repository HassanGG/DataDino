import style from "./SignUp.module.css"
import { useStyle } from "common/utils/css"
import { Link, useNavigate } from "react-router-dom"
import FormCard from "common/components/form-card"
import { UserContext } from "common/contexts/user.context"
import { UserService } from "common/services/user.service"
import { Formik, Form, Field } from "formik"
import { useContext } from "react"
import { SignUpFormTypes } from "./SignUp.types"
import Logo from "common/components/logo"
import Label from "common/components/label"

export const SignUpPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues = {
    displayName: "",
    email: "",
    password: "",
  }

  const onSubmit = async (values: SignUpFormTypes) => {
    const userId = await UserService.signUp({ ...values })
    if (!userId) throw "Failed to create user"

    const { email, password } = values
    const user = await UserService.login({ email, password })
    if (!user) throw "Failed to login to new user account"

    setUser(user)
    navigate("/")
  }

  const _labelStyle = useStyle({
    [style.label]: true,
    "mb-4": true,
  })

  return (
    <>
      <div className={style.signup}>
        <FormCard>
          <Logo medium />
          <Label title text="WELCOME USER" className={_labelStyle} />
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className=" d-flex flex-column align-items-center justify-content-around w-100">
              <div className="form-group mt-3 w-100">
                <Field
                  className="form-control"
                  name="displayName"
                  placeholder="Display name"
                  required
                />
              </div>
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
                Sign up
              </button>
            </Form>
          </Formik>
          <div className="d-flex">
            <p>Already a member? &nbsp;</p>
            <Link className={style.link} to={"/login"}>
              Sign in now
            </Link>
          </div>
        </FormCard>
      </div>
    </>
  )
}
