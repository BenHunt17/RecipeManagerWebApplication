import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={133.333}
    height={133.333}
    viewBox="0 0 100 100"
    {...props}
  >
    <path d="M75.6 22.9 72.7 26l-29.6.2c-28.8.3-29.6.4-29.6 2.3s.8 2 29.5 2.3l29.4.2 3.2 3.1c2.8 2.7 3.6 3 8.5 2.7 4.6-.3 5.4-.6 5.4-2.3 0-1.6-.8-2.1-3.7-2.3-2.4-.2-3.8-.8-3.8-1.7 0-.9 1.4-1.5 3.8-1.8l3.7-.4-3.7-.1c-2.6-.1-3.8-.7-3.8-1.6 0-1 1.3-1.6 3.8-1.8 2.9-.2 3.7-.7 3.7-2.3 0-1.7-.8-2-5.5-2.3-5-.3-5.8 0-8.4 2.7zM18.1 40.4c-5.3 1.9-7.1 4.9-7.1 11.7V58h77v-6.3c0-7.2-1.9-9.9-8.1-11.7-5.1-1.5-57.6-1.1-61.8.4zM11 68.6c0 9.7.7 11.7 5.3 14.1C19 84.2 23 84.5 44 84.8c28.7.4 35.7-.1 40.2-3.2l3.3-2.2.3-9.7.3-9.7H75.3c-11.6 0-13.3.3-17.8 2.5-2.7 1.3-6.4 2.5-8.1 2.5-3.7 0-12.4-2.8-12.4-4.1 0-.5-5.8-.9-13-.9H11v8.6z" />
  </svg>
);

export default SvgComponent;