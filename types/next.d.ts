declare module "next/navigation" {
  export interface AppRouterInstance {
    push: (href: string, options?: { scroll?: boolean }) => void;
    replace: (href: string, options?: { scroll?: boolean }) => void;
    refresh: () => void;
    back: () => void;
  }

  export const useRouter: () => AppRouterInstance;
  export const usePathname: () => string;
  export const useSearchParams: () => URLSearchParams;
}

declare module "next/link" {
  import * as React from "react";

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
  }

  const Link: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;

  export default Link;
}

declare module "next/image" {
  import * as React from "react";

  interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    placeholder?: "empty" | "blur";
    blurDataURL?: string;
  }

  const Image: React.ForwardRefExoticComponent<
    ImageProps & React.RefAttributes<HTMLImageElement>
  >;

  export default Image;
}

declare module "next/script" {
  import * as React from "react";

  interface ScriptProps extends React.ScriptHTMLAttributes<HTMLScriptElement> {
    src: string;
    strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload";
    onLoad?: () => void;
  }

  const Script: React.FC<ScriptProps>;

  export default Script;
}

declare module "next/server" {
  export class NextResponse extends Response {
    static next(): NextResponse;
    static redirect(url: string, init?: number | ResponseInit): NextResponse;
    cookies: Map<string, { value: string }>;
  }

  export interface NextRequest extends Request {
    nextUrl: URL;
    headers: Headers;
    cookies: {
      get: (name: string) => { value: string } | undefined;
    };
  }
}
