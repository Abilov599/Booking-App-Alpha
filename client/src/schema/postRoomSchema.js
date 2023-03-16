import * as Yup from "yup";

export const postRoomSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  type: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(8, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.number().min(2, "Too Short!").required("Required"),
  price: Yup.number()
    .min(50, "Too Little!")
    .max(10000, "Too Much!")
    .required("Required"),
  maxAdultCount: Yup.number()
    .min(0, "Too Little!")
    .max(5, "Too Much!")
    .required("Required"),
  maxChildCount: Yup.number().max(5, "Too Much!").required("Required"),
  thumbnailImage: Yup.string().url("this must be url").required("Required"),
  image1: Yup.string().url("this must be url").required("Required"),
  image2: Yup.string().url("this must be url").required("Required"),
  image3: Yup.string().url("this must be url").required("Required"),
});
