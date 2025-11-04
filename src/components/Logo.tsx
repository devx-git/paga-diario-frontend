import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="160"
      height="40"
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_105_2)">
        <path
          d="M24.8168 20.9855L20.3235 28.528H15.6517L22.5652 16.5126L22.5869 16.4711L15.8236 4.77099H20.4954L24.8594 12.06L29.2017 4.77099H33.8735L27.1319 16.4711L27.1102 16.5126L31.5402 23.9455L24.8168 35.229H20.145L24.8168 28.528V20.9855Z"
          className="fill-primary"
        />
        <path
          d="M12.3168 20.9855L7.82353 28.528H3.15168L10.0652 16.5126L10.0869 16.4711L3.32363 4.77099H7.99543L12.3594 12.06L16.7017 4.77099H21.3735L14.6319 16.4711L14.6102 16.5126L19.0402 23.9455L12.3168 35.229H7.64503L12.3168 28.528V20.9855Z"
          className="fill-primary"
        />
      </g>
      <text
        x="45"
        y="26"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="bold"
        className="fill-foreground"
      >
        Paga Diario
      </text>
      <defs>
        <clipPath id="clip0_105_2">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
