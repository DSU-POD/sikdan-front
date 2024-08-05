import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore, getPersistor } from "../store/store";
import { useEffect, useState } from "react"; // useState와 useEffect를 import
import LayoutComponent from "@/components/layout/layout";

export default function App({ Component, pageProps }) {
  const [storeAndPersistor, setStoreAndPersistor] = useState(null);

  useEffect(() => {
    const store = getStore();
    const persistor = getPersistor();
    setStoreAndPersistor({ store, persistor });
  }, []);

  if (!storeAndPersistor) return null;

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
