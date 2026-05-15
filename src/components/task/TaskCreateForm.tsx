import type {
  AssignmentRule,
  TaskCreateRequest,
  TaskPriority,
} from "../../types/task.types";

interface TaskCreateFormProps {
  value: TaskCreateRequest;
  showCreatedByInput: boolean;
  isSubmitting: boolean;
  onChange: (value: TaskCreateRequest) => void;
  onSubmit: () => void;
}

export function TaskCreateForm({
  value,
  showCreatedByInput,
  isSubmitting,
  onChange,
  onSubmit,
}: TaskCreateFormProps) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Yeni Task Oluştur</h2>
        <p className="mt-1 text-sm text-gray-500">
          Görev detaylarını ve atama kurallarını belirleyin.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Başlık Alanı - Tam Genişlik */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Başlık
          </label>
          <input
            id="title"
            type="text"
            placeholder="Görev başlığını girin"
            value={value.title}
            onChange={(event) =>
              onChange({
                ...value,
                title: event.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Açıklama Alanı - Tam Genişlik */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Açıklama
          </label>
          <textarea
            id="description"
            placeholder="Görev detaylarını ve gereksinimleri açıklayın"
            rows={4}
            value={value.description}
            onChange={(event) =>
              onChange({
                ...value,
                description: event.target.value,
              })
            }
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Öncelik Alanı - Yarı Genişlik */}
        <div>
          <label htmlFor="priority" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Öncelik
          </label>
          <select
            id="priority"
            value={value.priority}
            onChange={(event) =>
              onChange({
                ...value,
                priority: event.target.value as TaskPriority,
              })
            }
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="HIGH">Yüksek</option>
            <option value="MEDIUM">Orta</option>
            <option value="LOW">Düşük</option>
          </select>
        </div>

        {/* Atama Kuralı Alanı - Yarı Genişlik */}
        <div>
          <label htmlFor="assignmentRule" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Atama Kuralı
          </label>
          <select
            id="assignmentRule"
            value={value.assignmentRule}
            onChange={(event) =>
              onChange({
                ...value,
                assignmentRule: event.target.value as AssignmentRule,
              })
            }
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="INDIVIDUAL">Kişiye atanır</option>
            <option value="GROUP_ANYONE">Gruptan bir kişi tamamlayabilir</option>
            <option value="GROUP_EVERYONE">Gruptaki herkes tamamlamalı</option>
          </select>
        </div>

        {/* Bitiş Tarihi Alanı - Yarı Genişlik */}
        <div>
          <label htmlFor="dueDate" className="mb-1.5 block text-sm font-semibold text-gray-700">
            Bitiş Tarihi
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            value={value.dueDate}
            onChange={(event) =>
              onChange({
                ...value,
                dueDate: event.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Oluşturan Admin ID (Opsiyonel) - Yarı Genişlik */}
        {showCreatedByInput && (
          <div>
            <label htmlFor="createdBy" className="mb-1.5 block text-sm font-semibold text-gray-700">
              Oluşturan Admin ID
            </label>
            <input
              id="createdBy"
              type="number"
              placeholder="Admin ID"
              value={value.createdBy}
              onChange={(event) =>
                onChange({
                  ...value,
                  createdBy: Number(event.target.value),
                })
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        )}

        {/* Submit Butonu Alanı - Tam Genişlik */}
        <div className="mt-4 flex md:col-span-2 md:justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Oluşturuluyor...
              </>
            ) : (
              "Task oluştur"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}