/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_CAT_API_KEY: string;
  // readonly VITE_CHATGPT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
