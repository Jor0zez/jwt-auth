"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Avatar, Button, Input, Segmented, message } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import store from "@/store/store";

const validationSchema = Yup.object().shape({
  login: Yup.string().required("Enter login").min(3, "Min 3"),
  password: Yup.string().required("Enter password").min(3, "Min 3"),
});
const initialValues = {
  login: "",
  password: "",
};

const Home = () => {
  const [state, setState] = useState("Authorization");
  const [loading, setLoading] = useState(false);

  const titleText =
    state === "Authorization" ? "Authorization" : "Registration";

  const onExit = async () => {
    setLoading(true);
    await store.logout();

    setLoading(false);
    return;
  };
  const onSubmit = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    setLoading(true);
    const result = state === "Authorization";
    if (result) {
      await store.login(login, password);
    } else {
      await store.registration(login, password);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.checkAuth();
    }
  }, [loading]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[30%]">
        {store.isAuth && store.userLogin ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Avatar shape="square" size="large">
                {store.userLogin[0]}
              </Avatar>
              <h1 className="text-[18px] font-medium">
                Hello, {store.userLogin}
              </h1>
            </div>
            <Button onClick={onExit} block loading={loading}>
              Logout
            </Button>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {(props) => (
              <Form>
                <div className="relative w-full h-5 flex items-center justify-center text-center mb-5 overflow-hidden">
                  <AnimatePresence>
                    <motion.h1
                      key={titleText}
                      initial={{ top: 70 }}
                      animate={{ top: "auto" }}
                      exit={{ top: 70 }}
                      className="absolute text-[18px]">
                      {titleText}
                    </motion.h1>
                  </AnimatePresence>
                </div>
                <div className="flex flex-col gap-3">
                  <Segmented
                    value={state}
                    block
                    options={["Authorization", "Registration"]}
                    onChange={(e) => setState(e.toString())}
                  />
                  <Input
                    placeholder="Login"
                    autoFocus={true}
                    value={props.values.login}
                    onChange={(e) =>
                      props.setFieldValue("login", e.target.value)
                    }
                    status={props.errors.login ? "error" : ""}
                    size="middle"
                  />
                  {props.errors.login && (
                    <div className="leading-[0px] text-red-500 text-[14px]">
                      {props.errors.login}
                    </div>
                  )}
                  <Input
                    placeholder="Password"
                    value={props.values.password}
                    onChange={(e) =>
                      props.setFieldValue("password", e.target.value)
                    }
                    status={props.errors.password ? "error" : ""}
                    size="middle"
                  />
                  {props.errors.password && (
                    <div className="leading-[0px] text-red-500 text-[14px]">
                      {props.errors.password}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block>
                      {titleText}
                    </Button>
                    {titleText === "Authorization" && (
                      <Button>Restore password</Button>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default observer(Home);
