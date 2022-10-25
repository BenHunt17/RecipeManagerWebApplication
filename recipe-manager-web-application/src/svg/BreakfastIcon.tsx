import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={133.333}
    height={133.333}
    viewBox="0 0 100 100"
    {...props}
  >
    <path d="m76 36.7-19.5 6.7L33 44l-23.5.5-.3 4.8c-.7 10.2 5.7 23.5 14.4 30.2 6.6 5 14.5 7.6 24.5 8.2 8 .5 9.1.3 17-2.8 7.7-3.1 12.5-6.7 17.4-13.1 4-5.3 6.8-15.1 6.3-22.3l-.3-5-9-.4-9-.3 14-4.7c11.7-3.9 14-5 14-6.6 0-1.1-.7-2.1-1.5-2.2-.8-.1-10.3 2.8-21 6.4z" />
  </svg>
);

export default SvgComponent;
