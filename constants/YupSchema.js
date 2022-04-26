import * as yup from 'yup';

//Here, the registration form is controlled by yup.
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir eposta adresi giriniz")
    .required("Eposta alanı zorunludur"),
  password: yup
    .string()
    .typeError("Şifrenizde sadece \"@/./+/-/_\" kullanabilirsin")
    .min(8, "Şifreniz 8 karakterden az olamaz")
    .max(32, "Şifreniz 32 karakterden fazla olamaz")
    .required("Şifre alanı zorunludur"),
});

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir eposta adresi giriniz")
    .required("Eposta alanı zorunludur"),
  password: yup
    .string()
    .typeError("Şifrenizde sadece \"@/./+/-/_\" kullanabilirsin")
    .min(8, "Şifreniz 8 karakterden az olamaz")
    .max(32, "Şifreniz 32 karakterden fazla olamaz")
    .required("Şifre alanı zorunludur"),
});