/// <reference types="vite/client" />

// Tell TS that importing `*.md?raw` gives you a string
declare module '*.md?raw' {
  const content: string
  export default content
}