import { useEffect, useMemo, useState } from "react";
import { signUp } from "./api";
import { Input } from "./components/Input";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../../shared/components/languageSelector";

export function SignUp() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [apiProgress, setApiProgress] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  // const { t } = useTranslation();
  const { t } = useTranslation();

  const passwordRepeatError = useMemo(() => {
    if (repassword && password !== repassword) {
      console.log("changes in passwords fields");
      return t("passwordMismatch");
    }
    return "";
  }, [password, repassword]);

  useEffect(() => {
    setErrors((lastError) => {
      return {
        ...lastError,
        username: undefined,
      };
    });
  }, [userName]);

  useEffect(() => {
    setErrors((lastError) => {
      return {
        ...lastError,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    setErrors((lastError) => {
      return {
        ...lastError,
        password: undefined,
      };
    });
  }, [password]);

  useEffect(() => {
    setGeneralError("");
    setSuccessMessage("");
  }, [userName, email, password, repassword]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    // signUp({
    //   username: userName,
    //   email,
    //   password,
    // })
    //   .then((res) => {
    //     setSuccessMessage(res.data.message);
    //   })
    //   .finally(() => setApiProgress(false));
    try {
      const response = await signUp({
        username: userName,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (err) {
      if (err.response && err.response.data?.validationErrors) {
        setErrors(err.response.data?.validationErrors);
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>{t("signUp")}</h1>
            <LanguageSelector />
          </div>
          <div className="card-body">
            <Input
              id="username"
              label={t("username")}
              error={errors.username}
              onChange={(event) => setUserName(event.target.value)}
            />
            <Input
              id="email"
              label={t("email")}
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              label={t("password")}
              type="password"
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Input
              id="passwordRepeat"
              label={t("passwordRepeat")}
              type="password"
              error={passwordRepeatError}
              onChange={(event) => setRepassword(event.target.value)}
            />
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {generalError && (
              <div className="alert alert-danger" role="alert">
                {generalError}
              </div>
            )}
            <div className="text-center">
              <button
                className="btn btn-primary "
                disabled={apiProgress || !password || password !== repassword}
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    aria-hidden="true"
                  ></span>
                )}
                {t("signUp")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
