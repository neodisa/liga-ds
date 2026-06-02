// AUTO-GENERATED from Suitcase.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconSuitcase = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g mask="url(#a)"><path fill="currentColor" d="M14 2.5q.825 0 1.413.588Q16 3.676 16 4.5v2h4q.825 0 1.413.588Q22 7.676 22 8.5v11q0 .825-.587 1.412A1.93 1.93 0 0 1 20 21.5H4q-.824 0-1.413-.588A1.93 1.93 0 0 1 2 19.5v-11q0-.824.587-1.412A1.93 1.93 0 0 1 4 6.5h4v-2q0-.824.587-1.412a1.93 1.93 0 0 1 1.414-.588zm-10 13v4h16v-4h-6l-1 2h-2l-1-2zm0-2h16v-5H4zm6-7h4v-2h-4z" /></g></svg>;
const ForwardRef = forwardRef(IconSuitcase);
export default ForwardRef;