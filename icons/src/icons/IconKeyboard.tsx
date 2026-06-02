// AUTO-GENERATED from Keyboard.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconKeyboard = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="M3 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 1 19V6q0-.824.587-1.412A1.93 1.93 0 0 1 3 4h18q.824 0 1.413.588Q23 5.175 23 6v13q0 .824-.587 1.413A1.93 1.93 0 0 1 21 21zm0-2h18V6H3zm5-2h8v-1H8zm-3-3h2v-2H5zm4 0h2v-2H9zm4 0h2v-2h-2zm4 0h2v-2h-2zM5 10h2V8H5zm4 0h2V8H9zm4 0h2V8h-2zm4 0h2V8h-2z" /></g></svg>;
const ForwardRef = forwardRef(IconKeyboard);
export default ForwardRef;