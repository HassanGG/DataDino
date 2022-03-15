import style from "./Login.module.css"
import { useStyle } from "common/utils/css"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "common/contexts/user.context"
import { UserService } from "common/services/user.service"
import { Formik, Form, Field } from "formik"
import { useContext } from "react"
import { LogInFormType } from "./Login.types"
import FormCard from "common/components/form-card"

export const LoginPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    email: "",
    password: "",
  }

  const onSubmit = async (values: LogInFormType) => {
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

  const _style = useStyle({
    [style.login]: true,
  })

  const _btnStyle = useStyle({
    [style.btn]: true,
    "mt-5": true,
  })

  return (
    <>
      <div className={_style}>
        <FormCard>
          <h1 className="mb-5">Sign In</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className=" d-flex flex-column align-items-center justify-content-around w-100">
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
              <button className={_btnStyle} type="submit">
                LOGIN
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
