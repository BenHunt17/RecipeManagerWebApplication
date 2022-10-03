import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={170.667}
    height={170.667}
    viewBox="0 0 128 128"
    {...props}
  >
    <path d="M0 5.8C0 8 3.9 12.4 21.5 30L43 51.5v21.8c0 19.8.2 21.8 1.8 22.4.9.4 9.7 6.7 19.4 14.1 11.5 8.8 18.2 13.2 19.3 12.9 1.3-.6 1.5-5 1.5-35.9V51.5L106.5 30C124.1 12.4 128 8 128 5.8V3H0v2.8zm100.8 22.9L80 49.5l-.2 32.8-.3 32.9-15.7-11.9-15.7-11.8v-21l-.1-21-20.7-20.7L6.5 8h115l-20.7 20.7z" />
  </svg>
);

export default SvgComponent;
