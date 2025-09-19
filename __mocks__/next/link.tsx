import { forwardRef, AnchorHTMLAttributes } from 'react';

const Link = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function LinkComponent({ children, href, ...props }, ref) {
    return (
      <a ref={ref} href={typeof href === 'string' ? href : '#'} {...props}>
        {children}
      </a>
    );
  },
);

export default Link;
