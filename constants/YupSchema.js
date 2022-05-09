//Yup structure that provides control of login, register and product adding forms

import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir eposta adresi giriniz")
    .required("Eposta alanı zorunludur"),
  password: yup
    .string()
    .typeError('Şifrenizde sadece "@/./+/-/_" kullanabilirsin')
    .min(8, "Şifreniz 8 karakterden az olamaz")
    .max(20, "Şifreniz 20 karakterden fazla olamaz")
    .required("Şifre alanı zorunludur"),
});

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen geçerli bir eposta adresi giriniz")
    .required("Eposta alanı zorunludur"),
  password: yup
    .string()
    .typeError('Şifrenizde sadece "@/./+/-/_" kullanabilirsin')
    .min(8, "Şifreniz 8 karakterden az olamaz")
    .max(20, "Şifreniz 20 karakterden fazla olamaz")
    .required("Şifre alanı zorunludur"),
});

export const ProductSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Ürün Adı 100 karakterden fazla olamaz")
    .required("Ürün Adı alanı zorunludur"),
  description: yup
    .string()
    .max(500, "Açıklama 500 karakterden fazla olamaz")
    .required("Açıklama alanı zorunludur"),
  category: yup.string().required("Kategori alanı zorunludur"),
  brand: yup.string(),
  color: yup.string(),
  status: yup.string().required("Kullanım Durumu alanı zorunludur"),
  price: yup.number().required("Şifre alanı zorunludur"),
  isOfferable: yup.boolean(),
});
