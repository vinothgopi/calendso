/**
 * @deprecated file
 * All new changes should be made to the V2 file in
 * `/packages/features/ee/common/components/v2/LicenseRequired.tsx`
 */
import DOMPurify from "dompurify";
import { useSession } from "next-auth/react";
import React, { AriaRole, ComponentType, Fragment } from "react";

import { APP_NAME, CONSOLE_URL, SUPPORT_MAIL_ADDRESS } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { EmptyScreen, Icon } from "@calcom/ui";

type LicenseRequiredProps = {
  as?: keyof JSX.IntrinsicElements | "";
  className?: string;
  role?: AriaRole | undefined;
  children: React.ReactNode;
};

/**
 * @deprecated file
 * All new changes should be made to the V2 file in
 * `/packages/features/ee/common/components/v2/LicenseRequired.tsx`
 * This component will only render it's children if the installation has a valid
 * license.
 */
const LicenseRequired = ({ children, as = "", ...rest }: LicenseRequiredProps) => {
  const { t } = useLocale();
  const session = useSession();
  const Component = as || Fragment;
  return (
    <Component {...rest}>
      {session.data?.hasValidLicense ? (
        children
      ) : (
        <EmptyScreen
          Icon={Icon.FiAlertTriangle}
          headline={t("enterprise_license")}
          description={
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t("enterprise_license_description", {
                    consoleUrl: `<a href="${CONSOLE_URL}" target="_blank" rel="noopener noreferrer" class="underline">
                ${APP_NAME}
              </a>`,
                    supportMail: `<a href="mailto:${SUPPORT_MAIL_ADDRESS}" class="underline">
                ${SUPPORT_MAIL_ADDRESS}
              </a>`,
                  })
                ),
              }}
            />
          }
        />
      )}
    </Component>
  );
};

export const withLicenseRequired =
  <T,>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (hocProps: T) =>
    (
      <LicenseRequired>
        <Component {...hocProps} />
      </LicenseRequired>
    );

export default LicenseRequired;
