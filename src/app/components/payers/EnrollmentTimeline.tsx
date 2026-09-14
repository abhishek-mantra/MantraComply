import { Clock } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "status_change" | "comment" | "document";
  title: string;
  description?: string;
  user: string;
  timestamp: string;
}

interface EnrollmentTimelineProps {
  events: TimelineEvent[];
}

export function EnrollmentTimeline({ events }: EnrollmentTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              event.type === "status_change" ? "bg-blue-100" :
              event.type === "comment" ? "bg-gray-100" :
              "bg-green-100"
            }`}>
              <Clock className={`w-4 h-4 ${
                event.type === "status_change" ? "text-blue-600" :
                event.type === "comment" ? "text-gray-600" :
                "text-green-600"
              }`} />
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 mt-1" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="text-sm font-medium text-gray-900">{event.title}</p>
            {event.description && (
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {event.user} • {event.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
