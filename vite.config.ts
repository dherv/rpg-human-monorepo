import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        searchForWorkspaceRoot(
          "../../barbarian-with-style/src/components/Tab.tsx"
        ),
        searchForWorkspaceRoot(
          "../../barbarian-with-style/src/components/Tabs.tsx"
        ),
      ],
    },
  },
});
