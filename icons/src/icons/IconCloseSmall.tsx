// AUTO-GENERATED from CloseSmall.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconCloseSmall = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="M8.4 17 7 15.6l3.6-3.6L7 8.425l1.4-1.4 3.6 3.6 3.575-3.6 1.4 1.4-3.6 3.575 3.6 3.6-1.4 1.4L12 13.4z" /></g></svg>;
const ForwardRef = forwardRef(IconCloseSmall);
export default ForwardRef;