import type { TaskAssignmentResponse } from "../../types/assignment.types";
import type { TaskStatus } from "../../types/task.types";
import { TASK_STATUS_LABELS } from "../../constants/enums";
import { formatDateTime } from "../../utils/date";

interface MyTaskListProps {
  assignments: TaskAssignmentResponse[];
  isUpdating: boolean;
  onStatusChange: (assignmentId: number, newState: TaskStatus) => void;
}

export function MyTaskList({
  assignments,
  isUpdating,
  onStatusChange,
}: MyTaskListProps) {
  // Görev yoksa gösterilecek boş durum tasarımı
  if (!assignments.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
        <svg
          className="mb-4 h-12 w-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900">Görev Bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          Şu anda size atanmış herhangi bir görev görünmüyor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {assignments.map((assignment) => (
        <div
          key={assignment.id}
          className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          {/* Ceza uygulandıysa üst kısımdaki kırmızı şerit */}
          {assignment.penaltyApplied && (
            <div className="absolute left-0 top-0 h-1 w-full bg-red-500" />
          )}

          {/* Kart Başlığı ve Ceza Badge Alanı */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Atama #{assignment.id}
              </span>
              <h3 className="mt-1 text-lg font-bold text-gray-800">
                Task ID: {assignment.taskId}
              </h3>
            </div>
            {assignment.penaltyApplied ? (
              <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
                Ceza Uygulandı
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                Ceza Yok
              </span>
            )}
          </div>

          {/* Bilgi Satırları */}
          <div className="mb-6 flex-1 space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="font-medium text-gray-500">Grup ID:</span>
              <span className="font-semibold text-gray-900">
                {assignment.groupId ?? "-"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="font-medium text-gray-500">Durum:</span>
              <span className="font-semibold text-gray-900">
                {TASK_STATUS_LABELS[assignment.taskState]}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-2">
              <span className="font-medium text-gray-500">Tamamlanma:</span>
              <span className="font-semibold text-gray-900">
                {assignment.completedAt
                  ? formatDateTime(assignment.completedAt)
                  : "-"}
              </span>
            </div>
          </div>

          {/* Durum Güncelleme Select Alanı */}
          <div className="mt-auto">
            <label
              htmlFor={`status-${assignment.id}`}
              className="mb-1.5 block text-xs font-semibold text-gray-500"
            >
              Durumu Güncelle
            </label>
            <select
              id={`status-${assignment.id}`}
              value={assignment.taskState}
              disabled={isUpdating}
              onChange={(event) =>
                onStatusChange(assignment.id, event.target.value as TaskStatus)
              }
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="PENDING">Bekliyor</option>
              <option value="IN_PROGRESS">Devam ediyor</option>
              <option value="COMPLETED">Tamamlandı</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}