// AUTO-GENERATED from Folder.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconFolder = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h6l2 2h8q.824 0 1.413.588Q22 7.175 22 8v10q0 .824-.587 1.413A1.93 1.93 0 0 1 20 20zm0-2h16V8h-8.825l-2-2H4z" /></g></svg>;
const ForwardRef = forwardRef(IconFolder);
export default ForwardRef;