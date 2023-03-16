import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { message } from "antd";
import { Formik, Form, Field } from "formik";
import "./index.scss";
import { postRoomSchema } from "../../../schema/postRoomSchema";

const AdminHome = () => {
  // http://localhost:8080/api/rooms

  // const [postImage, setPostImage] = useState({
  //   myFiles: [""],
  // });
  // const handleFileUpload = async (e) => {
  //   const file = e.target.files;
  //   const base64 = await convertToBase64(file);
  //   setPostImage({ ...postImage, myFiles: base64 });
  // };

  return (
    <main id="admin-home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
      </Helmet>
      <div>
        <h1>Post Room</h1>

        <Formik
          initialValues={{
            name: "",
            type: "Single Room",
            phoneNumber: "",
            maxAdultCount: "",
            maxChildCount: "",
            description: "",
            price: "",
            address: "",
            image1: "",
            image2: "",
            image3: "",
            thumbnailImage: "",
          }}
          validationSchema={postRoomSchema}
          onSubmit={(values) => {
            const {
              name,
              type,
              phoneNumber,
              maxAdultCount,
              maxChildCount,
              description,
              price,
              address,
              image1,
              image2,
              image3,
              thumbnailImage,
            } = values;

            const temp = {
              name: name,
              type: type,
              phoneNumber: phoneNumber,
              maxAdultCount: maxAdultCount,
              maxChildCount: maxChildCount,
              description: description,
              price: price,
              address: address,
              images: [image1, image2, image3],
              thumbnailImage: thumbnailImage,
            };

            try {
              axios.post("http://localhost:8080/api/rooms", temp);
              message.success("Room posted successfully");
            } catch (error) {
              message.error(error.message);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="fields">
                <div className="other-fields">
                  <Field name="name" placeholder="Name" />

                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}

                  <Field name="type" placeholder="Type" />

                  {errors.type && touched.type ? (
                    <div>{errors.type}</div>
                  ) : null}

                  <Field name="address" placeholder="Address" />

                  {errors.address && touched.address ? (
                    <div>{errors.address}</div>
                  ) : null}

                  <Field
                    name="description"
                    type="text-area"
                    placeholder="Description"
                  />

                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}

                  <Field name="phoneNumber" type="tel" placeholder="Phone" />

                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div>{errors.phoneNumber}</div>
                  ) : null}

                  <Field
                    name="maxAdultCount"
                    type="number"
                    placeholder="Adult count"
                  />

                  {errors.maxAdultCount && touched.maxAdultCount ? (
                    <div>{errors.maxAdultCount}</div>
                  ) : null}
                </div>

                <div className="images-fields">
                  <Field
                    name="maxChildCount"
                    type="number"
                    placeholder="Child count"
                  />

                  {errors.maxChildCount && touched.maxChildCount ? (
                    <div>{errors.maxChildCount}</div>
                  ) : null}

                  <Field name="price" type="number" placeholder="Price" />

                  {errors.price && touched.price ? (
                    <div>{errors.price}</div>
                  ) : null}

                  <Field name="thumbnailImage" placeholder="Thumbnail Image" />

                  {errors.thumbnailImage && touched.thumbnailImage ? (
                    <div>{errors.thumbnailImage}</div>
                  ) : null}

                  <Field name="image1" placeholder="Image 1" />

                  {errors.image1 && touched.image1 ? (
                    <div>{errors.image1}</div>
                  ) : null}
                  <Field name="image2" placeholder="Image 2" />

                  {errors.image2 && touched.image2 ? (
                    <div>{errors.image2}</div>
                  ) : null}
                  <Field name="image3" placeholder="Image 3" />

                  {errors.image3 && touched.image3 ? (
                    <div>{errors.image3}</div>
                  ) : null}
                </div>
              </div>

              <button type="submit">Post Room</button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default AdminHome;
