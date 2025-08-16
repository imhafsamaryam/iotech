"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SubscriptionSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function EmailSubscriptionForm() {
  const [status, setStatus] = useState<
    null | "success" | "duplicate" | "error"
  >(null);
  const language = useSelector((state: RootState) => state.language.lang);
  const API_BASE = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <div className="max-w-max ">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={SubscriptionSchema}
        onSubmit={async (values, { resetForm }) => {
          setStatus(null);

          try {
            const getRes = await axios.get(
              `${API_BASE}/customers?filters[email][$eq]=${encodeURIComponent(
                values.email
              )}`
            );

            if (getRes.data?.data?.length > 0) {
              setStatus("duplicate");
              return;
            }

            const postRes = await axios.post(
              "https://sacred-renewal-8564485713.strapiapp.com/api/customers",
              {
                data: { email: values.email },
              }
            );

            if (postRes.status === 200 || postRes.status === 201) {
              setStatus("success");
              resetForm();
            } else {
              setStatus("error");
            }
          } catch (error) {
            console.error(error);
            setStatus("error");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col md:flex-row md:items-center gap-2">
            {status === "success" && (
              <p className="text-green-600 text-xs">Subscription successful!</p>
            )}
            {status === "duplicate" && (
              <p className="text-yellow-600 text-xs">
                This email is already subscribed.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-xs">
                Something went wrong. Please try again.
              </p>
            )}
            <div>
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  placeholder={
                    language == "en"
                      ? "Enter your email"
                      : "أدخل بريدك الإلكتروني"
                  }
                  className={`text-black ${
                    language == "en" ? "text-left  pr-32" : "text-right  pl-32"
                  } text-xs p-3 rounded-lg bg-white border-0 focus:outline-none focus:ring-0  `}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`absolute top-1/2 text-xs ${
                    language == "en" ? "right-1" : "left-1"
                  } right-1 w-[110px] transform -translate-y-1/2 bg-[#4D2617] text-white px-6 py-2 rounded-xl hover:bg-brown-700 disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                        ></path>
                      </svg>
                    </>
                  ) : language == "en" ? (
                    "Subscribe"
                  ) : (
                    "اشترك"
                  )}
                </button>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-xs mt-1"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
