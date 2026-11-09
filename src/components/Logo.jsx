/** Anandotsav "A" mark (from public/brand/anandotsav-logo.webp). */
export default function Logo({ className = 'size-10' }) {
  return (
    <img
      src="/brand/mark-96.png"
      srcSet="/brand/mark-96.png 1x, /brand/mark-192.png 2x"
      alt=""
      aria-hidden="true"
      width="48"
      height="48"
      className={`${className} object-contain`}
    />
  )
}
