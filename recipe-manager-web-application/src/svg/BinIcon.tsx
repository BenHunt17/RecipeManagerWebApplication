import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    viewBox="0 0 150 150"
    {...props}
  >
    <path d="M54.6 6 52 10H24l-1.1 2.7C20.8 18.2 18.6 18 76 18s55.2.2 53.1-5.3L128 10h-25.8L99 6l-3.2-4H57.3l-2.7 4zm40.2 2.7c.3 1-3.8 1.3-18.3 1.3-16.7 0-18.6-.2-17.5-1.5 1.1-1.3 4-1.5 18.3-1.3 12.5.2 17.1.6 17.5 1.5zM23.5 21.9c-.5 1 9.1 116.5 10 118.8.3 1 9.6 1.3 41.9 1.3 22.8 0 41.7-.4 42-.8.3-.5 3.3-27.1 6.6-59.1 4.8-45.5 5.9-58.6 4.9-59.7-1-1.2-9.2-1.4-53-1.4-30.9 0-52 .4-52.4.9z" />
  </svg>
);

export default SvgComponent;
