// AUTO-GENERATED from Summary.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSummary = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="M21 7v2H3V7zm0 4v2H7v-2zm0 4v2H3v-2zM4 11q.424 0 .713.287Q5 11.576 5 12q0 .424-.287.713A.97.97 0 0 1 4 13a.97.97 0 0 1-.712-.287A.97.97 0 0 1 3 12q0-.424.288-.713A.97.97 0 0 1 4 11" /></g></svg>;
const ForwardRef = forwardRef(IconSummary);
export default ForwardRef;