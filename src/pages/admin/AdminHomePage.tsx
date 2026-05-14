import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export function AdminHomePage() {
  return (
    <main>
      <h1>Admin Panel</h1>

      <p>
        Kullanıcı, grup, task oluşturma ve task atama işlemleri bu panelden
        yapılır.
      </p>

      <ul>
        <li>
          <Link to={ROUTES.adminUsers}>Kullanıcı yönetimine git</Link>
        </li>
        <li>
          <Link to={ROUTES.adminGroups}>Grup yönetimine git</Link>
        </li>
        <li>
          <Link to={ROUTES.adminTasks}>Task listesine git</Link>
        </li>
        <li>
          <Link to={ROUTES.adminTaskCreate}>Task oluştur</Link>
        </li>
        <li>
          <Link to={ROUTES.adminTaskAssign}>Task ata</Link>
        </li>
      </ul>
    </main>
  );
}
