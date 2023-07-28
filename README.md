## Cài đặt customize-cra

`npm i customize-cra react-app-rewired -D`

Create a _config-overrides.js_ file in the root directory

*config-overrides.js*

```
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```

*package.json*

```
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

## Cài đặt babel-plugin-module-resolver

`npm install --save-dev babel-plugin-module-resolver`

Create a _.babelrc_ file in the root directory

```
{
    "plugins": [
        [
            "module-resolver",
            {
                "alias": {
                    "~": "./src"
                }
            }
        ]
    ]
}
```

Create a _jsconfig.json_ file in the root directory

*jsconfig.json*

```
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "~/*": ["src/*"]
        }
    }
}
```

*config-overrides.js*

```
const { override, useBabelRc } = require('customize-cra');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
);

```

## Cài đặt và cấu hình Prettier

Create a _.prettierrc_ file in the root directory

*.prettierrc*

```
{
    "arrowParens": "always",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxSingleQuote": false,
    "printWidth": 120,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "all",
    "useTabs": false,
    "vueIndentScriptAndStyle": false
}
```

Create a _.vscode/settings.json_ file in the root directory

*.vscode/settings.json*

```
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Cấu hình sử dụng CSS/SASS

`npm i -D sass`

`npm install --save normalize.css`

Create a _src/components/GlobalStyles/GlobalStyles.scss_ and _src/components/GlobalStyles/index.js_ files

*src/components/GlobalStyles/GlobalStyles.scss*

```
@import 'normalize.css';
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap');

* {
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    text-rendering: optimizeSpeed;
}
```

*src/components/GlobalStyles/index.js*

```
import './GlobalStyles.scss';
function GlobalStyles( {children} ) {
    return children;
}

export default GlobalStyles;
```

*src/index.js*

```
...
import GlobalStyles from '~/components/GlobalStyles';
...
  <GlobalStyles>
    <App />
  </GlobalStyles>
...
```

## Cấu hình Router/Layout cho dự án

`npm i react-router-dom`

Create a _src/pages/Home/Home.js_ file

*src/pages/Home/Home.js*

```
function Home() {
    return <h1>Dành cho bạn</h1>;
}

export default Home;
```

Create a _src/routes/routes.js_ file

```
import Home from '~/pages/Home/Home.js';

export const publicRoutes = [
    { path: '/', component: Home },
];

export const privateRoutes = [];
```

*src/App/js*

```
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/routes-index';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map(function (route, index) {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
```

## Cấu hình Router/Layout cho dự án

Create a _src/layouts/DefautLayout/DefautLayout.js_ file

Create a _src/layouts/components/Header/Header.js_ file

Create a _src/layouts/layouts.js_

*src/layouts/layouts.js*

```
export { default as DefaultLayout } from './DefaultLayout/DefaultLayout.js';
```

*src/App.js*

```
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes/index_routes';
import DefaultLayout from '~/layouts/index_layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map(function (route, index) {
                        let Layout = DefaultLayout;
                        if (route.layout) Layout = route.layout;
                        else if (route.layout === null) Layout = Fragment;

                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
```