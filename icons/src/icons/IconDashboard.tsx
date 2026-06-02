// AUTO-GENERATED from Dashboard.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconDashboard = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" fillRule="evenodd" d="M11 3H3v8h8zm10 0h-8v8h8zM11 13H3v8h8zm4-4V5h4v4zM5 9V5h4v4zm0 10v-4h4v4zm8-6h8v8h-8zm6 2h-4v4h4z" clipRule="evenodd" /></g></svg>;
const ForwardRef = forwardRef(IconDashboard);
export default ForwardRef;