import Page from "common/components/page"

export const DocsPage = () => {
  return (
    <>
      <Page>
        <h1 className="mb-0">Documentation</h1>
        <small className="text-muted">
          As Team7 2.0 used React in our front-end, we must provide additional
          documentation.
        </small>
        <h2>React Concepts</h2>
        <p>
          React.js is a very large and powerful library for building UIs. It's
          documentation is a better descriptor than anything we could write
          here, so you can find links below to the elements of React that you
          must be familiar with in order to understand how DataDino works.
          <ul>
            <li>
              <a href="https://reactjs.org/docs/introducing-jsx.html">JSX</a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/rendering-elements.html">
                Rendering Elements
              </a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/components-and-props.html">
                Components and Props
              </a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/state-and-lifecycle.html">
                State and Lifecycle
              </a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/handling-events.html">
                Handling Events
              </a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/conditional-rendering.html">
                Conditional Rendering
              </a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/lists-and-keys.html">
                Lists and Keys
              </a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/context.html">Contexts</a>
            </li>
            <li>
              <a href="https://reactjs.org/docs/fragments.html">Fragments</a>
            </li>
          </ul>
        </p>
        <h2>How we used React</h2>
        <p>
          First, a couple large decisions we made up front:
          <ul>
            <li>
              We used Typescript instead of Javascript (& TSX instead of JSX)
              because we prefer catching errors before runtime ;)
            </li>
            <li>
              We used function components instead of class components for the
              clearer and easier to understand syntax.
            </li>
          </ul>
        </p>
        <h3>Getting Started</h3>
        <p>
          We used <i>create-react-app</i> to create a hello-world basic React
          app with Typescript.
          <br />
          From there, we learned how to use CSS modules with React so that our
          CSS for each component was scoped. Having said that, we tried to rely
          on Bootstrap as much as possible.
        </p>
        <h3>Breaking DataDino Down</h3>
        <h4>Pages</h4>
        <p>
          Each page of our app is a React component with a dedicated folder
          containing it's component. The folders for pages are nested to match
          the app routes; e.g. the landing page and profile pages are both top
          level but the checkout and cart pages are nested within the datasets
          folder. Most pages are wrapped with our custom <i>Page</i> component
          that will add the navigation bar and optionally the back & shopping
          cart buttons.
          <br />
          <br />
          Each page folder will always have:
          <ul>
            <li>
              <i>index.ts</i>: for exporting the page component so it can be
              default imported via the page folder.
            </li>
            <li>
              <i>[PageName].tsx</i>: the page component itself.
            </li>
          </ul>
          <br />
          Each page folder will sometimes have:
          <ul>
            <li>
              <i>[PageName].module.css</i>: scoped CSS styles for the page
              component.
            </li>
            <li>
              <i>[PageName].types.ts</i>: types & interfaces that may be
              relevant only to the page.
            </li>
          </ul>
        </p>
        <h4>Common</h4>
        <p>
          The <i>common</i> folder contains code that is used in various places
          within DataDino. Sub-folders include:
          <ul>
            <li>
              <i>components</i>: React components. Most of which are purely for
              rendering data passed via props e.g. <i>dataset-card</i>. Others
              are helper components used to create a cleaner way to do something
              e.g. <i>query-component</i>.
            </li>
            <li>
              <i>contexts</i>: React contexts. This contains our one and only{" "}
              <i>UserContext</i>. This provides it's users with user data; e.g.
              is there a user signed in, what are their details, what is in
              their shopping cart, etc. We decided to make this a context to
              avoid prop drilling as this data is essential in so many
              components throughout the app.
            </li>
            <li>
              <i>data</i>: Data models. Typescript interfaces/types/enums to
              model the data that is relevant to the UI.
            </li>
            <li>
              <i>services</i>: Singletons used by components for interacting
              with the backend, divided on a per-data-model basis.
            </li>
            <li>
              <i>style</i>: CSS that we want to be global. Files contain CSS
              variables that are used throughout the app for things like primary
              color and font.
            </li>
            <li>
              <i>utils</i>: Utility functions. <i>useStyle</i> helps us compose
              class names conditionally. We thought we would use it a lot more
              than we did... <br />
              <i>fetchJson</i> helps us use the fetch API but for fetching JSON
              (a little bit cleaner than using fetch everywhere).
            </li>
          </ul>
        </p>
        <h4>Dependencies</h4>
        <p>
          We took advantage of the ecosystem by using lots of additional
          libraries, big and small. Below are the most relevant ones:
          <li>
            <a href="https://www.npmjs.com/package/aveta">Aveta</a> for
            formatting large numbers.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/bootstrap">Bootstrap 5</a>{" "}
            for lot's of CSS classes and also icons!
          </li>
          <li>
            <a href="https://www.npmjs.com/package/formik">Formik</a> for
            creating forms.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/lodash">Lodash</a> for the
            debounce helper function.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/moment">Moment</a> for
            formatting dates.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/react-query">React Query</a>{" "}
            for making requests via our services inside React components,
            handling loading & error states.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/react-use-storage">
              React Use Storage
            </a>{" "}
            for using the storage web API via React hooks to create the shopping
            cart (uses local storage) and persisting user data (uses session
            storage).
          </li>
          <li>
            <a href="https://www.npmjs.com/package/recharts">Recharts</a> for
            rendering charts.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/timeago.js">Timeago</a> for
            formatting a date to be relative to the current time.
          </li>
          <li>
            <a href="https://www.npmjs.com/package/truncate">Truncate</a> for
            truncating text.
          </li>
        </p>
        <h4>Other</h4>
        <p>
          The <i>mocks</i> folder contains code for a{" "}
          <a href="https://www.npmjs.com/package/msw">mock service worker</a>{" "}
          that we used for some testing before the backend was ready. We used{" "}
          <a href="https://www.npmjs.com/package/faker">Faker</a> to generate
          the mock data. Feel free to ignore this folder.
          <br />
          The <i>static</i> folder contains the app logo.
        </p>
      </Page>
    </>
  )
}
