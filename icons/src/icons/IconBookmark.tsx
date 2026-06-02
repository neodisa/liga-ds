// AUTO-GENERATED from Bookmark.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconBookmark = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill="currentColor" d="M6.01 2c-1.093 0-2 .901-2 2L4 22l8-3 8 3V4c0-1.094-.906-2-2-2zm0 2H18v15.115l-6-2.25-6 2.25z" /></svg>;
const ForwardRef = forwardRef(IconBookmark);
export default ForwardRef;