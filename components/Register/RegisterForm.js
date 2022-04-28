import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from 'next/router'

import { RegisterSchema } from "../../constants/YupSchema";
import styles from "./register.module.scss";
import LoadingIcon from './../../constants/icons/Loading';
import { useAuth } from "../../contexts/user";
import triggerToast from './../../constants/toastify';

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const {authRegister} = useAuth();
  const router = useRouter();

  //Here, the formic hook and the form that will appear on the screen are linked to the formic hook.
  const { handleSubmit,handleChange,handleBlur,values,errors,touched } = useFormik({
    initialValues:{
      email: "",
      password: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res= await authRegister(values.email,values.password);
      if(res === 200){
        triggerToast('success','Kaydınız başarılı anasayfaya yönlendiriliyorsunuz!');
        setTimeout(()=>{
          router.replace("/");
        },2000);
      } else if (res === 402) {
        triggerToast('error', 'Bu email zaten sistemde kayıtlı!');
      } else if (res === 400) {
        triggerToast('error', 'Emailiniz veya şifreniz hatalı!');
      } else {
        triggerToast('error', 'Bir hata meydana geldi!');
      }
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
        <h1>Üye Ol</h1>
        <span>Fırsatlardan yararlanmak için üye ol!</span>
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
        </div>
        <div className={`${styles.formGroup} ${styles.formButton}`}>
          <button
            className={styles.registerButton}
            type="submit"
            onClick={()=>formSubmit()}
            disabled={loading}
          >
          {loading ? <LoadingIcon size={30} color="white"/> : "Üye Ol"}
          </button>
        </div>
      </div>
      <div className={styles.formBottom}>
        <span>
          Hesabın yok mu?
          <Link href="/login">
            <a className={styles.login}> Giriş Yap</a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default RegisterForm;
