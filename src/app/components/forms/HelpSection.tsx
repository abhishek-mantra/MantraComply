import { HELP_CENTER_BASE_URL } from "../../config/helpCenter";

export function HelpSection() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
      <div className="flex items-start gap-2">
        <svg className="w-5 h-5 text-[#2196F3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="font-medium text-gray-900 text-sm">Need Help?</p>
          <p className="text-sm text-gray-700">
            Our credentialing specialists and compliance guides are here to assist you.
          </p>
          <a
            href={HELP_CENTER_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#2196F3] hover:underline mt-1 inline-flex items-center gap-1"
          >
            <span>Visit MantraComply Help Center →</span>
          </a>
        </div>
      </div>
    </div>
  );
}