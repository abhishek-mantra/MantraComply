import React from "react";
import { HelpCircle, ExternalLink } from "lucide-react";
import { getHelpArticleUrl } from "../../config/helpCenter";

interface ContextualHelpLinkProps {
  slug: string;
  label: string;
  hint?: string;
  className?: string;
}

export function ContextualHelpLink({
  slug,
  label,
  hint,
  className = "",
}: ContextualHelpLinkProps) {
  const url = getHelpArticleUrl(slug);

  return (
    <div className={`mt-2 flex flex-col gap-0.5 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2196F3] hover:text-[#1976D2] hover:underline transition-colors group cursor-pointer"
        title="Opens Help Center guide in a new tab"
      >
        <HelpCircle className="w-3.5 h-3.5 shrink-0 text-[#2196F3] group-hover:scale-105 transition-transform" />
        <span>{label}</span>
        <ExternalLink className="w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
      </a>
      {hint && (
        <span className="text-[11px] text-gray-500 pl-5 leading-tight">
          {hint}
        </span>
      )}
    </div>
  );
}

export default ContextualHelpLink;
