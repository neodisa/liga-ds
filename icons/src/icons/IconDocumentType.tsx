// AUTO-GENERATED from DocumentType.svg — do not edit by hand.
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const IconDocumentType = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<mask id="a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="currentColor" d="M0 0h24v24H0z" /></mask><g fill="currentColor" mask="url(#a)"><path d="M6 8.874a4 4 0 0 1-2-1.228V20q0 .824.588 1.413Q5.175 22 6 22h12q.824 0 1.413-.587Q20 20.825 20 20V8l-6-6H9.646a4 4 0 0 1 1.228 2H13v5h5v11H6z" /><path d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" /></g></svg>;
const ForwardRef = forwardRef(IconDocumentType);
export default ForwardRef;