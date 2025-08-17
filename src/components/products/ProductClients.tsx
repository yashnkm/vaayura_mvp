"use client";

import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel, type Logo } from "@/components/ui/logo-carousel";

// Placeholder logos - can be replaced with actual client logos later
function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="209"
      height="256"
      viewBox="0 0 814 1000"
      {...props}
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function BMWIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 498.503 498.503"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M249.251 498.503c66.577 0 129.168-25.928 176.247-73.005 47.077-47.078 73.005-109.67 73.005-176.247 0-66.576-25.928-129.168-73.005-176.246C378.42 25.927 315.828 0 249.251 0 111.813 0 0 111.813 0 249.251c0 66.577 25.927 129.169 73.005 176.247 47.078 47.077 109.67 73.005 176.246 73.005z" />
      <path
        d="M8.624 249.251c0-64.272 25.03-124.699 70.479-170.148 45.449-45.45 105.875-70.479 170.148-70.479s124.7 25.029 170.148 70.479c45.449 45.449 70.479 105.875 70.479 170.148 0 132.683-107.945 240.628-240.627 240.628-64.273 0-124.699-25.03-170.148-70.479C33.654 373.95 8.624 313.524 8.624 249.251z"
        fill="#fff"
      />
      <path d="M249.251 18.541c-127.416 0-230.71 103.294-230.71 230.71s103.294 230.711 230.71 230.711c127.416 0 230.71-103.295 230.71-230.711s-103.294-230.71-230.71-230.71z" />
    </svg>
  );
}

function LowesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={91.239998}
      height={42.970001}
      {...props}
    >
      <g fillOpacity={1} fillRule="nonzero" stroke="none">
        <path
          d="M155.876 378.285l-23.048 9.873h-14.376v4.027h-7.201v27.07h89.24v-27.07h-7.198v-4.027h-14.37l-23.047-9.873z"
          fill="#004990"
          transform="translate(-110.251 -377.285)"
        />
        <path
          d="M177.157 395.357v4.377l2.83.005.59-4.38-3.42-.001zM192.465 399.15c.183 0 .348-.014.348-.237 0-.175-.163-.207-.313-.207h-.295v.443h.26zm-.26.802h-.216v-1.43h.545c.336 0 .504.125.504.407 0 .257-.159.368-.369.394l.406.629h-.242l-.378-.62h-.25v.62zm.263.32c.561 0 1.004-.439 1.004-1.038 0-.587-.443-1.03-1.004-1.03-.569 0-1.011.443-1.011 1.03 0 .599.442 1.038 1.011 1.038m-1.261-1.038c0-.712.577-1.237 1.261-1.237.676 0 1.255.525 1.255 1.237 0 .718-.579 1.245-1.255 1.245-.684 0-1.261-.527-1.261-1.245M125.486 410.27v-14.913h-4.079v18.465h10.39v-3.551h-6.31zM166.547 413.822h9.709v-3.556h-5.61v-2.317h5.61v-3.424h-5.61v-2.33h5.61v-3.571h-9.71V413.822zM141.12 402.195h-3.588v8.057h3.588v-8.057zm4.086 9.687a1.942 1.942 0 01-1.941 1.94h-7.879c-1.071 0-1.94-.87-1.94-1.94v-11.317a1.94 1.94 0 011.94-1.941h7.879a1.94 1.94 0 011.941 1.941v11.317z"
          fill="#fff"
          transform="translate(-110.251 -377.285)"
        />
      </g>
    </svg>
  );
}

function VercelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 222"
      width="256"
      height="222"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path fill="#000" d="m128 0 128 221.705H0z" />
    </svg>
  );
}

const StripeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={214}
    viewBox="0 0 512 214"
    {...props}
  >
    <path
      fill="#FFC957"
      d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756z"
    />
  </svg>
);

const TypeScriptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    width={256}
    height={256}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="#3178C6"
    />
    <path
      d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
      fill="#FFF"
    />
  </svg>
);

function SupabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 109 113"
      width="109"
      height="113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#a)"
      />
      <path
        d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient
          id="a"
          x1="53.974"
          y1="54.974"
          x2="94.163"
          y2="71.829"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const NextjsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={180}
    height={180}
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={90} cy={90} r={87} fill="black" stroke="white" strokeWidth={6} />
    <path
      d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
      fill="url(#paint0_linear_408_139)"
    />
    <rect x={115} y={54} width={12} height={72} fill="url(#paint1_linear_408_139)" />
    <defs>
      <linearGradient
        id="paint0_linear_408_139"
        x1={109}
        y1={116.5}
        x2={144.5}
        y2={160.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_408_139"
        x1={121}
        y1={54}
        x2={120.799}
        y2={106.875}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

const TailwindCSSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 54 33"
    {...props}
  >
    <g clipPath="url(#prefix__clip0)">
      <path
        fill="#38bdf8"
        fillRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" d="M0 0h54v32.4H0z" />
      </clipPath>
    </defs>
  </svg>
);

// Array of placeholder logos - to be replaced with actual client logos
const allLogos: Logo[] = [
  { name: "Apple", id: 1, img: AppleIcon },
  { name: "Supabase", id: 2, img: SupabaseIcon },
  { name: "Vercel", id: 3, img: VercelIcon },
  { name: "Lowes", id: 4, img: LowesIcon },
  { name: "BMW", id: 7, img: BMWIcon },
  { name: "Nextjs", id: 9, img: NextjsIcon },
  { name: "Tailwind", id: 10, img: TailwindCSSIcon },
  { name: "Typescript", id: 12, img: TypeScriptIcon },
  { name: "Stripe", id: 13, img: StripeIcon },
];

export function ProductClients() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="space-y-8">
          <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-brand-dark-grey font-body">
                Trusted by Industry Leaders
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
                Join the <span className="text-brand-pastel-green">Clean Air Revolution</span>
              </h2>
              <p className="text-lg text-brand-dark-grey font-body max-w-2xl mx-auto">
                Leading organizations trust Vaayura for their air purification needs.
              </p>
            </div>

            <LogoCarousel columnCount={5} logos={allLogos} />
          </div>
        </div>
      </div>
    </section>
  );
}