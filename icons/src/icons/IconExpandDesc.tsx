// AUTO-GENERATED from ExpandDesc.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconExpandDesc = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="m12 21-4.5-4.5 1.45-1.45L12 18.1l3.05-3.05 1.45 1.45z" /><path fill="currentColor" fillOpacity={0.3} d="m7.5 7.6 1.45 1.45L12 6l3.05 3.05L16.5 7.6 12 3.1z" /></g></svg>;
const ForwardRef = forwardRef(IconExpandDesc);
export default ForwardRef;