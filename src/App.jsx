import { useRef, useState, version } from 'react'
import { preload } from 'react-dom'
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Form } from './components/Form'

import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const inputFocus = useRef()

  preload('https://react.dev/_next/image?url=%2Fimages%2Fuwu.png&w=640&q=75', {
    as: 'image',
    priority: 'low',
  })

  return (
    <>
      <title>{`React 19 - RC counter: ${counter}`}</title>
      <meta name="description" content="React 19 - RC" />
      <header>
        <h1>React 19 - RC</h1>
        <small>Version: {version}</small>
      </header>
      <main>
        <section className="card-container">
          <h2>🚀 Novedades:</h2>
          <article className="card">
            <header className="card__header">
              <h3>Metadata en los componentes</h3>
            </header>
            <div>
              <p>
                Antiguamente para tener un title dinamico habia que modificar el
                objeto document del DOM
              </p>
              <hr />
              <SyntaxHighlighter language="jsx" style={oneDark}>
                {OLD_VERSION_TO_UPDATE_TITLE.trim()}
              </SyntaxHighlighter>
              <hr />
              <p>
                Ahora para hacerlo, directamente podemos agregar el tag en el
                JSX y modificarlo con una interacción
              </p>
              <SyntaxHighlighter language="jsx" style={oneDark}>
                {NEW_VERSION_TO_UPDATE_TITLE.trim()}
              </SyntaxHighlighter>
              <button onClick={() => setCounter(counter + 1)}>
                Aumentar el contador del title [valor actual: {counter}]
              </button>
              <blockquote>
                <p>
                  Importante: Cada vez que usemos esta etiqueta title dentro de
                  los componentes, no se van a sobre escribir, sino que se van a
                  generar una detras de otra. Esto puede ser un problema muy
                  grande para el SEO ya que podemos tener muchas etiquetas title
                  una detras de otra.
                </p>
                <p>
                  Lo mejor para solucionar esto es hacerlo en un contexto y
                  olvidarnos de importar esta etiqueta title en cada componente
                </p>
              </blockquote>
            </div>
          </article>
          <article className="card">
            <header className="card__header">
              <h3>No mas soporte a las defaultProps</h3>
            </header>
            <div>
              <p>
                Antes podiamos usar defaultProps para tipar nuestros componentes
                de React y darle valores por defecto (esto solo funcionaba en
                modo desarrollo). Ahora, la manera recomendada de hacer esto
                segun el equipo de React es que lo hagamos con TypeScript. Asi
                que si actualizamos a la version 19 y queremos usar las
                defaultProps, estas van a ser totalmente ignoradas.
              </p>
              <SyntaxHighlighter language="jsx" style={oneDark}>
                {DEFAULT_PROPS.trim()}
              </SyntaxHighlighter>
            </div>
          </article>
          <article className="card">
            <header className="card__header">
              <h3>preload, preconnect y prefetchDNS</h3>
            </header>
            <div>
              <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Ocultar' : 'Mostrar'} formulario
              </button>
              {showForm && <Form />}
              <p>
                El formulario tiene dentro una imagen que es de un dominio
                externo, para mostrarla tiene que hacer una peticion a ese
                dominio para obtenerla. Esto puede llevar tiempo, asi que lo que
                podemos hacer es un precargar esa imagen y luego cargarla cuando
                la necesitemos, sin tener que esperar todo ese proceso.
              </p>
              <p>
                Esto es util cuando queremos cargar recursos que no son criticos
                y que sabemos que los vamos a necesitar. En este caso lo hicimos
                con una imagen, pero puede ser con JavaScript, CSS y mucho mas.
              </p>
              <SyntaxHighlighter language="jsx" style={oneDark}>
                {`preload('https://react.dev/_next/image?url=%2Fimages%2Fuwu.png&w=640&q=75', {
    as: 'image',
    priority: 'low',
  })
`}
              </SyntaxHighlighter>
              <p>
                Luego tenemos <code>preconnect</code> que es como el preload
                pero con menos priodidad, son cosas que no sabemos que la vamos
                a precisas.
              </p>
              <p>
                El <code>prefetchDNS</code> es para hacer un prefetch y sirve
                para hacer ahorrarse un poco de tiempo en aquellas conexiones
                que sabemos que vamos a hacer.
              </p>
              <blockquote>
                Todas estas conexiones se cargan una sola vez, luego si el
                componente se vuelve a renderizar, esta conexion queda en cache
                y no se vuelve a consumir.
              </blockquote>
              <blockquote>
                Todo esto funciona para server side rendering tambien!
              </blockquote>
            </div>
          </article>
          <article className="card">
            <header className="card__header">
              <h3>👋 Chau a forwardRef y hola a la prop ref</h3>
            </header>
            <div>
              <Form ref={inputFocus} />
              <p>
                Antiguamente en React para pasar una referencia de un componente
                padre a un componente hijo hacia falta envolver el componente
                hijo en un metodo llamado <code>forwardRef</code> (como se va a
                ver en el ejemplo). Esto significaba mucha complejidad agregada
                y codigo repetitivo. Ahora con la nueva version, todos los
                componentes van a recibir una prop por defecto llamada ref, que
                va a cumplir la misma finalidad que <code>forwardRef</code> sin
                la necesidad de escribirlo.
              </p>
              <p>
                A que podemos asemejar esta prop? A <code>children</code>, todos
                los componentes tienen esta propiedad por defecto, ahora ref va
                a ser una mas.
              </p>
            </div>
            <hr />
            <p>Como se hacia antes:</p>
            <SyntaxHighlighter language="jsx" style={oneDark}>
              {OLD_FORWARD_REF.trim()}
            </SyntaxHighlighter>
            <hr />
            <p>Como se hace ahora:</p>
            <SyntaxHighlighter language="jsx" style={oneDark}>
              {NEW_FORWARD_REF.trim()}
            </SyntaxHighlighter>
          </article>
        </section>
      </main>
    </>
  )
}

const OLD_VERSION_TO_UPDATE_TITLE = `
import { useEffect, useState } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
  document.title = \`React 19 - RC - \${counter}\`
  }, [counter])

  return <>
  <button onClick={() => setCounter(counter + 1)}>Incrementar contador</button>
  </>
}
`

const NEW_VERSION_TO_UPDATE_TITLE = `
import { useState } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  return <>
    {/* Si queremos pasar contenino dinamico en el tag de title, tenemos que encerrar el contenido llaves, sino no funciona */}
    <title>{\`React 19 - RC counter: \${counter}\`}</title>
    <meta name="description" content="React 19 - RC" />
    <button onClick={() => setCounter(counter + 1)}>Incrementar contador</button>
  </>
}
`

const DEFAULT_PROPS = `App.defaultProps = {
  name: 'default name'
  description: 'default description'
}`

const OLD_FORWARD_REF = `
// Componente padre 👴🏼
const App = () => {
  const inputRef = useRef()

  return <OldForm ref={inputRef} />
}


// Componente hijo 👶🏻
export const OldForm = forwardRef((_, ref) => {
  const handleFocusInput = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <>
      <form className="form">
        <input ref={ref} name="nickname" placeholder="madeval" />
      </form>
      <button onClick={handleFocusInput}>Dar focus al input</button>
    </>
  )
})

// Esto era necesario para que el componente se renderice con el nombre que le pasamos
OldForm.displayName = 'OldForm'
`

const NEW_FORWARD_REF = `
// Componente padre 👴🏼
const App = () => {
  const inputRef = useRef()

  return <Form ref={inputRef} />
}

// Componente hijo 👶🏻
export function Form({ ref } = {}) {
  const handleFocusInput = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <>
      <form className="form">
        <input ref={ref} name="nickname" placeholder="madeval" />
      </form>
      <button onClick={handleFocusInput}>Dar focus al input</button>
    </>
  )
}
`

export default App
