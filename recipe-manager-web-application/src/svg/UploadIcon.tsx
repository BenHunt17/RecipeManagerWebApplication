import * as React from "react";

const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    viewBox="0 0 150 150"
    {...props}
  >
    <path d="M53.4 32.6c-12 12.9-21.9 24.3-21.9 25.2 0 1.5 1.4 1.7 10.2 2l10.3.3.2 22.2.3 22.2h47l.3-22.2.2-22.2 10.3-.3c8.9-.3 10.2-.5 10.2-2 0-2-42.2-48.8-44-48.8-.6 0-11 10.6-23.1 23.6z" />
    <path d="M10 111.5V139h131V84h-12v36H24V84H10v27.5z" />
  </svg>
);

export default SvgComponent;
