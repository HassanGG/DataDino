import style from "./SignUp.module.css"
import { useStyle } from "common/utils/css"
import { Link, useNavigate } from "react-router-dom"
import FormCard from "common/components/form-card"
import { UserContext } from "common/contexts/user.context"
import { UserService } from "common/services/user.service"
import { Formik, Form, Field } from "formik"
import { useContext } from "react"
import { SignUpFormTypes } from "./SignUp.types"

export const SignUpPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    email: "",
    password: "",
  }

  const onSubmit = async (values: SignUpFormTypes) => {
    const successful = await UserService.signUp({ ...values })

    if (successful) {
      const { email, password } = values
      const user = await UserService.login({ email, password })
      setUser(user)
      return navigate("/")
    } else {
      // Throw an error
    }
  }

  const _btnStyle = useStyle({
    [style.btn]: true,
    "mt-5": true,
  })

  return (
    <>
      <div className={style.signup}>
        <FormCard>
          <h1 className="mb-5">Sign Up</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className=" d-flex flex-column align-items-center justify-content-around w-100">
              <div className="form-group mt-3 w-100">
                <Field
                  className="form-control"
                  name="username"
                  placeholder="display name"
                  required
                />
              </div>
              <div className="form-group mt-3 w-100">
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                />
              </div>
              <div className="form-group mt-3 w-100">
                <Field
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                />
              </div>
              <div className="form-group mt-3 d-flex flex-column justify-content-center align-items-center">
                <button className={_btnStyle} type="submit">
                  SIGN UP
                </button>
              </div>
            </Form>
          </Formik>
          <div className="d-flex">
            <p>Already a member? &nbsp;</p>
            <Link className={style.link} to={"/login"}>
              Log in now
            </Link>
          </div>
        </FormCard>
      </div>
    </>
  )
}
