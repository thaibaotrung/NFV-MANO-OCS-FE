import { RouterProvider } from "react-router-dom";

// project import
import router from "routes";
import ThemeCustomization from "themes";

import Locales from "components/Locales";
import ScrollTop from "components/ScrollTop";
import Snackbar from "components/@extended/Snackbar";
import Notistack from "components/third-party/Notistack";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// auth-provider
import { JWTProvider as AuthProvider } from "contexts/JWTContext";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "request/query-client";
import { AppLoading } from "common/loading";
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            {/* <RTLLayout> */}
            <Locales>
              <ScrollTop>
                <AuthProvider>
                  <>
                    <Notistack>
                      <AppLoading />
                      <RouterProvider router={router} />
                      <Snackbar />
                      <ToastContainer />
                    </Notistack>
                  </>
                </AuthProvider>
              </ScrollTop>
            </Locales>
            {/* </RTLLayout> */}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeCustomization>
  );
};

export default App;
