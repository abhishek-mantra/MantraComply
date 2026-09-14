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
  const cleanLabel = label.replace(/\s*→\s*$/, "");

  return (
    <div className={`mt-2 inline-flex items-center ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2196F3] hover:text-[#1976D2] hover:underline transition-colors group cursor-pointer"
        title={hint || "Opens Help Center guide in a new tab"}
      >
        <HelpCircle className="w-3.5 h-3.5 shrink-0 text-[#2196F3] group-hover:scale-105 transition-transform" />
        <span>{cleanLabel}</span>
        <ExternalLink className="w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
}

export default ContextualHelpLink;
