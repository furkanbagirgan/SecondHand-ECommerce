import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import { LoginSchema } from "../../constants/YupSchema";
import styles from "./login.module.scss";
import LoadingIcon from './../../constants/icons/Loading';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(()=>{
    /*const userMode=JSON.parse(localStorage.getItem("mode"));
    if(userMode){
      if(userMode==="light"){
        setMode(true);
      }
      else{
        setMode(false);
      }
    }
    else{
      localStorage.setItem("mode",JSON.stringify("light"));
    }*/
  },[]);

  //Here, the formic hook and the form that will appear on the screen are linked to the formic hook.
  const { handleSubmit,handleChange,handleBlur,values,errors,touched } = useFormik({
    initialValues:{
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      setLoading(false);
    },
  });

  const formSubmit= ()=>{
    setShowError(true);
    handleSubmit();
  }

  return (
    <div className={styles.form}>
      <div className={styles.formTop}>
        <h1>Giriş Yap</h1>
        <span>Fırsatlardan yararlanmak için giriş yap!</span>
      </div>
      <div className={styles.formMiddle}>
        <div className={(errors.email && touched.email && values.email!=="") ? `${styles.formGroup} ${styles.formError}` : styles.formGroup}>
          <label className={styles.title}>
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {(showError && errors.email) && <span>{errors.email}</span>}
        </div>
        <div className={(errors.password && touched.password && values.password!=="") ? `${styles.formGroup} ${styles.formError}` : styles.formGroup}>
          <label className={styles.title}>
            Şifre
          </label>
          <input
            type="password"
            name="password"
            placeholder=""
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {(showError && errors.password) && <span>{errors.password}</span>}
          <div className={styles.forgetPassword}>Şifremi Unuttum</div>
        </div>
        <div className={`${styles.formGroup} ${styles.formButton}`}>
          <button
            className={styles.loginButton}
            type="submit"
            onClick={()=>formSubmit()}
            disabled={loading}
          >
          {loading ? <LoadingIcon size={30} color="white"/> : "Giriş"}
          </button>
        </div>
      </div>
      <div className={styles.formBottom}>
        <span>
          Hesabın yok mu?
          <Link href="/register">
            <a className={styles.register}> Üye Ol</a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
