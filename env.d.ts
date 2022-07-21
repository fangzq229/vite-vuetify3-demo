interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly REQUERT_TIMEOUT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}