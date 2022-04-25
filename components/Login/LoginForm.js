import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";

import { LoginSchema } from "../../constants/YupSchema";
import styles from "./login.module.scss";

function LoginForm() {
  const [loading, setLoading] = useState(false);

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
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (auth) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert(
          JSON.stringify(
            "Hoşgeldiniz " + auth.userName + ", Kaydınız başarıyla oluşturuldu."
          )
        );
      }, 3000);
    },
  });

  return (
    <div className={styles.form}>
      <div className={styles.formTop}>
        <h1>Giriş Yap</h1>
        <span>Fırsatlardan yararlanmak için giriş yap!</span>
      </div>
      <div className={styles.formMiddle}>
        <div className={errors.email ? `${styles.formGroup} ${styles.formError}` : styles.formGroup}>
          <label className="title">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email@example.com"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className={errors.password ? `${styles.formGroup} ${styles.formError}` : styles.formGroup}>
          <label className="title">
            Şifre
          </label>
          <input
            type="password"
            name="password"
            placeholder=""
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formButton}`}>
          <button
            className="loginButton"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
          {loading ? <LoadingIcon size={30} color="white" /> : "KAYIT OL"}
          </button>
        </div>
      </div>
      <div className={styles.formBottom}>
        <span>
          Hesabın yok mu? 
          <Link href="/register">
            <a className="register">Üye Ol</a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
