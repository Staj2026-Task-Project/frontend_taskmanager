import type { GroupResponse } from "../../types/group.types";
import type { TaskAssignRequest } from "../../types/assignment.types";
import type { TaskResponse } from "../../types/task.types";
import type { UserResponse } from "../../types/user.types";

export type AssignmentTargetType = "USER" | "GROUP" | "GROUP_MEMBER";

interface TaskAssignFormProps {
  value: TaskAssignRequest;
  targetType: AssignmentTargetType;
  tasks: TaskResponse[];
  users: UserResponse[];
  groups: GroupResponse[];
  isSubmitting: boolean;
  onChange: (value: TaskAssignRequest) => void;
  onTargetTypeChange: (value: AssignmentTargetType) => void;
  onSubmit: () => void;
}

export function TaskAssignForm({
  value,
  targetType,
  tasks,
  users,
  groups,
  isSubmitting,
  onChange,
  onTargetTypeChange,
  onSubmit,
}: TaskAssignFormProps) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Task Ata</h2>
        <p className="mt-1 text-sm text-gray-500">
          Mevcut görevleri kullanıcılara veya gruplara atayın.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        {/* Task Seçimi */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Görev (Task)
          </label>
          <select
            value={value.taskId ?? ""}
            onChange={(event) =>
              onChange({
                ...value,
                taskId: Number(event.target.value),
              })
            }
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="" disabled>
              Task seç
            </option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                #{task.id} - {task.title}
              </option>
            ))}
          </select>
        </div>

        {/* Atama Tipi Seçimi */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Atama Tipi
          </label>
          <select
            value={targetType}
            onChange={(event) => {
              onTargetTypeChange(event.target.value as AssignmentTargetType);
              onChange({
                ...value,
                userId: undefined,
                groupId: undefined,
              });
            }}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="USER">Kullanıcıya ata</option>
            <option value="GROUP">Gruba ata</option>
            <option value="GROUP_MEMBER">Grup içindeki kullanıcıya ata</option>
          </select>
        </div>

        {/* Hedef Seçimleri (Dinamik Grid Yapısı) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Grup Seçimi (GROUP veya GROUP_MEMBER seçiliyse gösterilir) */}
          {(targetType === "GROUP" || targetType === "GROUP_MEMBER") && (
            <div className={targetType === "GROUP" ? "md:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Grup Seçimi
              </label>
              <select
                value={value.groupId ?? ""}
                onChange={(event) =>
                  onChange({
                    ...value,
                    groupId: Number(event.target.value),
                  })
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>
                  Grup seç
                </option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Kullanıcı Seçimi (USER veya GROUP_MEMBER seçiliyse gösterilir) */}
          {(targetType === "USER" || targetType === "GROUP_MEMBER") && (
            <div className={targetType === "USER" ? "md:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Kullanıcı Seçimi
              </label>
              <select
                value={value.userId ?? ""}
                onChange={(event) =>
                  onChange({
                    ...value,
                    userId: Number(event.target.value),
                  })
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>
                  Kullanıcı seç
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Buton Alanı */}
        <div className="mt-8 flex justify-end pt-4">
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
                Atanıyor...
              </>
            ) : (
              "Task ata"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}