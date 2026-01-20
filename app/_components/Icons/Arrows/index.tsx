interface ArrowProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Left({ size = 16, className, style }: ArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.5303301,6.53033009 C14.8232233,6.23743687 14.8232233,5.76256313 14.5303301,5.46966991 C14.2374369,5.1767767 13.7625631,5.1767767 13.4696699,5.46966991 L7.46966991,11.4696699 C7.1767767,11.7625631 7.1767767,12.2374369 7.46966991,12.5303301 L13.4696699,18.5303301 C13.7625631,18.8232233 14.2374369,18.8232233 14.5303301,18.5303301 C14.8232233,18.2374369 14.8232233,17.7625631 14.5303301,17.4696699 L9.06066017,12 L14.5303301,6.53033009 Z"
      />
    </svg>
  );
}

function Right({ size = 16, className, style }: ArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.46966991,17.4696699 C9.1767767,17.7625631 9.1767767,18.2374369 9.46966991,18.5303301 C9.76256313,18.8232233 10.2374369,18.8232233 10.5303301,18.5303301 L16.5303301,12.5303301 C16.8232233,12.2374369 16.8232233,11.7625631 16.5303301,11.4696699 L10.5303301,5.46966991 C10.2374369,5.1767767 9.76256313,5.1767767 9.46966991,5.46966991 C9.1767767,5.76256313 9.1767767,6.23743687 9.46966991,6.53033009 L14.9393398,12 L9.46966991,17.4696699 Z"
      />
    </svg>
  );
}

export const Arrow = {
  Left,
  Right,
};
