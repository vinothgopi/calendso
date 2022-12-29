import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

import classNames from "@calcom/lib/classNames";
import { defaultAvatarSrc } from "@calcom/lib/defaultAvatarImage";
import { Icon } from "@calcom/ui";

import { Maybe } from "@trpc/server";

export type AvatarProps = {
  className?: string;
  size: "xs" | "sm" | "md" | "mdLg" | "lg";
  imageSrc?: Maybe<string>;
  title?: string;
  alt: string;
  gravatarFallbackMd5?: string;
  fallback?: React.ReactNode;
  accepted?: boolean;
  asChild?: boolean; // Added to ignore the outer span on the fallback component - messes up styling
};

const sizesPropsBySize = {
  xs: "w-4 h-4", // 16px
  sm: "w-6 h-6", // 24px
  md: "w-8 h-8", // 32px
  mdLg: "w-10 h-10", //40px
  lg: "w-16 h-16", // 64px
} as const;

export function Avatar(props: AvatarProps) {
  const { imageSrc, gravatarFallbackMd5, size, alt, title } = props;
  const sizeClassname = sizesPropsBySize[size];
  const rootClass = classNames("rounded-full aspect-square ", sizeClassname);
  const avatar = (
    <AvatarPrimitive.Root
      className={classNames(
        sizeClassname,
        "dark:bg-darkgray-300 item-center relative inline-flex aspect-square justify-center overflow-hidden rounded-full"
      )}>
      <>
        <AvatarPrimitive.Image src={imageSrc ?? undefined} alt={alt} className={rootClass} />
        <AvatarPrimitive.Fallback delayMs={600} asChild={props.asChild}>
          <>
            {props.fallback && !gravatarFallbackMd5 && props.fallback}
            {gravatarFallbackMd5 && (
              <img src={defaultAvatarSrc({ md5: gravatarFallbackMd5 })} alt={alt} className={rootClass} />
            )}
          </>
        </AvatarPrimitive.Fallback>
        {props.accepted && (
          <div
            className={classNames(
              "absolute bottom-0 right-0 block rounded-full bg-green-400 text-white ring-2 ring-white",
              size === "lg" ? "h-5 w-5" : "h-2 w-2"
            )}>
            <div className="flex h-full items-center justify-center p-[2px]">
              {size === "lg" && <Icon.FiCheck />}
            </div>
          </div>
        )}
      </>
    </AvatarPrimitive.Root>
  );

  return title ? (
    <Tooltip.Provider>
      <Tooltip.Tooltip delayDuration={300}>
        <Tooltip.TooltipTrigger className="cursor-default">{avatar}</Tooltip.TooltipTrigger>
        <Tooltip.Content className="rounded-sm bg-black p-2 text-sm text-white shadow-sm">
          <Tooltip.Arrow />
          {title}
        </Tooltip.Content>
      </Tooltip.Tooltip>
    </Tooltip.Provider>
  ) : (
    <>{avatar}</>
  );
}
