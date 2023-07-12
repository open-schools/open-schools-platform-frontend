import getConfig from "next/config";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import styles from "./styles/styles.module.scss";

const {
  publicRuntimeConfig: { googleCaptcha },
} = getConfig();

export interface IAuthLayoutProps {
  headerAction: React.ReactElement;
  children: JSX.Element;
}

interface IGoogleReCaptchaContainer {
  element: string | HTMLElement;
  parameters: {
    badge?: "inline" | "bottomleft" | "bottomright";
    theme?: "dark" | "light";
    tabindex?: number;
    callback?: () => void;
    expiredCallback?: () => void;
    errorCallback?: () => void;
  };
}
interface IGoogleReCaptchaScriptProps {
  nonce?: string;
  defer?: boolean;
  async?: boolean;
  appendTo?: "head" | "body";
  id?: string;
  onLoadCallbackName?: string;
}
const GOOGLE_RECAPTCHA_CONTAINER: IGoogleReCaptchaContainer = {
  element: "ReCaptchaContainer",
  parameters: {
    badge: "inline",
  },
};
const GOOGLE_RECAPTCHA_SCRIPT_PROPS: IGoogleReCaptchaScriptProps = {
  async: true,
  defer: true,
  appendTo: "body",
};

// #TODO: take this variables from env
const {
  publicRuntimeConfig: {
    HelpRequisites: {
      support_email: SUPPORT_EMAIL = null,
      support_phone: SUPPORT_PHONE = null,
    },
  },
} /* = getConfig() */ = {
  publicRuntimeConfig: {
    HelpRequisites: {
      support_email: "openschools@education",
      support_phone: "+79999999999",
    },
  },
};

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
  const { children, ...otherProps } = props;
  // const { isAuthenticated } = useAuth()

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={googleCaptcha && googleCaptcha.SITE_KEY}
      useRecaptchaNet
      container={GOOGLE_RECAPTCHA_CONTAINER}
      scriptProps={GOOGLE_RECAPTCHA_SCRIPT_PROPS}
    >
      <div id="ReCaptchaContainer" />
      <div
        className={styles.container}
        style={{ backgroundImage: "url(/image/authImage.svg)" }}
      >
        {children}
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default AuthLayout;
