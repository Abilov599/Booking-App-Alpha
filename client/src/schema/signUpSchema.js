import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  termsOfService: Yup.bool()
    .required("You need to accept the terms of service")
    .oneOf([true], "You need to accept the terms of service"),
});
