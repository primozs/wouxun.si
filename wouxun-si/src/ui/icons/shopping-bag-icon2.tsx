import { component$ } from '@builder.io/qwik';

type Props = {
  class?: string;
  isEmpty: boolean;
};

export const ShoppingBagIcon2 = component$((props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
      stroke="currentColor"
      stroke-width="1.2"
      class={`h-6 w-6 ${props.class}`}
    >
      <path
        d="M13.1251 8.75V5C13.1251 4.1712 12.7959 3.37634 12.2098 2.79029C11.6238 2.20424 10.8289 1.875 10.0001 1.875C9.17131 1.875 8.37645 2.20424 7.7904 2.79029C7.20435 3.37634 6.87511 4.1712 6.87511 5V8.75M16.3384 7.08917L17.3909 17.0892C17.4493 17.6433 17.0159 18.125 16.4584 18.125H3.54178C3.41028 18.1251 3.28023 18.0976 3.16007 18.0442C3.0399 17.9908 2.93232 17.9127 2.8443 17.8151C2.75627 17.7174 2.68979 17.6023 2.64915 17.4772C2.60852 17.3521 2.59465 17.2199 2.60844 17.0892L3.66178 7.08917C3.68607 6.8588 3.7948 6.64558 3.96698 6.49063C4.13917 6.33568 4.36263 6.24996 4.59428 6.25H15.4059C15.8859 6.25 16.2884 6.6125 16.3384 7.08917ZM7.18761 8.75C7.18761 8.83288 7.15469 8.91237 7.09608 8.97097C7.03748 9.02958 6.95799 9.0625 6.87511 9.0625C6.79223 9.0625 6.71274 9.02958 6.65414 8.97097C6.59553 8.91237 6.56261 8.83288 6.56261 8.75C6.56261 8.66712 6.59553 8.58763 6.65414 8.52903C6.71274 8.47042 6.79223 8.4375 6.87511 8.4375C6.95799 8.4375 7.03748 8.47042 7.09608 8.52903C7.15469 8.58763 7.18761 8.66712 7.18761 8.75ZM13.4376 8.75C13.4376 8.83288 13.4047 8.91237 13.3461 8.97097C13.2875 9.02958 13.208 9.0625 13.1251 9.0625C13.0422 9.0625 12.9627 9.02958 12.9041 8.97097C12.8455 8.91237 12.8126 8.83288 12.8126 8.75C12.8126 8.66712 12.8455 8.58763 12.9041 8.52903C12.9627 8.47042 13.0422 8.4375 13.1251 8.4375C13.208 8.4375 13.2875 8.47042 13.3461 8.52903C13.4047 8.58763 13.4376 8.66712 13.4376 8.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!props.isEmpty && (
        <>
          <rect
            xmlns="http://www.w3.org/2000/svg"
            x="11"
            y="2"
            width="9"
            height="9"
            rx="5"
            fill="currentColor"
          />
          <rect
            xmlns="http://www.w3.org/2000/svg"
            x="12"
            y="4"
            width="5"
            height="5"
            rx="3"
            fill="currentColor"
          />
        </>
      )}
    </svg>
  );
});
