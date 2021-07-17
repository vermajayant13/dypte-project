import React, { useState, useEffect } from 'react';
import IDE from './ide'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>

      <div className="control-panel">

        Select language
        &nbsp; &nbsp;
        <select id ="languages" class="languages" onChange="changeLanguage()">

          <option value="html">Index.html</option>
          <option value="css">Index.css</option>
          <option value="js">Index.js</option>

        </select>
    </div>

      <div className="pane top-pane">
        <IDE
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <IDE
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <IDE
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;