// Minimal, dependency-free HTML for the SSR error fallback in src/server.ts.
// Kept framework-free since it renders when the app itself failed to render.

export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Algo deu errado</title>
    <style>
      body {
        margin: 0;
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        background: #f5f1e8;
        color: #1a3c2a;
        font-family: system-ui, sans-serif;
        text-align: center;
        padding: 1.5rem;
      }
      main { max-width: 28rem; }
      h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
      p { color: #2d5a3d; line-height: 1.5; }
      a { color: #1a3c2a; font-weight: 600; }
    </style>
  </head>
  <body>
    <main>
      <h1>Algo deu errado</h1>
      <p>
        Tivemos um problema ao carregar esta página. Tente novamente em
        alguns instantes ou volte para a <a href="/">página inicial</a>.
      </p>
    </main>
  </body>
</html>`;
}
