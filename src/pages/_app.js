import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore, getPersistor } from "../store/store";
import { useEffect, useState } from "react"; // useState와 useEffect를 import
import LayoutComponent from "@/components/layout/layout";
import Router from "next/router";
import NProgress from "nprogress";

import "nprogress/nprogress.css"; // 기본 스타일, 원한다면 커스터마이징 가능

export default function App({ Component, pageProps }) {
  const [storeAndPersistor, setStoreAndPersistor] = useState(null);

  useEffect(() => {
    const store = getStore();
    const persistor = getPersistor();
    setStoreAndPersistor({ store, persistor });
  }, []);

  if (!storeAndPersistor) return null;

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <Provider store={storeAndPersistor.store}>
      <PersistGate loading={null} persistor={storeAndPersistor.persistor}>
        <LayoutComponent isBeforeLogin={pageProps.isBeforeLogin}>
          <Component {...pageProps} />
        </LayoutComponent>
      </PersistGate>
    </Provider>
  );
}
