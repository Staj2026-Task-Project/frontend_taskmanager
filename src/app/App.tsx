import { Providers } from "./providers";
import { AppRouter } from "../router/AppRouter";

export function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}
