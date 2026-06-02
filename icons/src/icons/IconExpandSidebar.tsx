// AUTO-GENERATED from ExpandSidebar.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconExpandSidebar = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" d="M4 5.707h2v12H4zm4 7h8.586L12.293 17l1.414 1.414 6.707-6.707L13.707 5l-1.414 1.414 4.293 4.293H8z" /></svg>;
const ForwardRef = forwardRef(IconExpandSidebar);
export default ForwardRef;