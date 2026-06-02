// AUTO-GENERATED from Tag.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconTag = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="M12.575 21.4q-.6.6-1.425.6t-1.425-.6l-7.15-7.15A1.92 1.92 0 0 1 2 12.838q0-.838.575-1.413l8.8-8.825q.275-.276.65-.437a2 2 0 0 1 .8-.163h7.15q.825 0 1.412.587.588.588.588 1.413v7.15q0 .425-.163.8-.162.375-.437.65zm4.9-13.4q.625 0 1.063-.437.437-.438.437-1.063t-.437-1.062A1.45 1.45 0 0 0 17.475 5q-.625 0-1.062.438a1.45 1.45 0 0 0-.438 1.062q0 .624.438 1.063.436.437 1.062.437M11.15 20l8.825-8.85V4h-7.15L4 12.85z" /></g></svg>;
const ForwardRef = forwardRef(IconTag);
export default ForwardRef;