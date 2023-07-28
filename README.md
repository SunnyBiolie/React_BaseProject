# My Notes

## Cài đặt customize-cra

`npm i customize-cra react-app-rewired -D`

- Create a _config-overrides.js_ file in the root directory

***config-overrides.js***

```
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}
```

***package.json***

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

- Create a _.babelrc_ file in the root directory

***.babelrc***

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

- Create a _jsconfig.json_ file in the root directory

***jsconfig.json***

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

***config-overrides.js***

```
const { override, useBabelRc } = require('customize-cra');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
);

```

## Cài đặt và cấu hình Prettier

- Create a _.prettierrc_ file in the root directory

***.prettierrc***

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

- Create a _.vscode/settings.json_ file in the root directory

***.vscode/settings.json***

```
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Cấu hình sử dụng CSS/SASS

`npm i -D sass`

`npm install --save normalize.css`

- Create a _src/components/GlobalStyles/GlobalStyles.scss_ and _src/components/GlobalStyles/index.js_ files

***src/components/GlobalStyles/GlobalStyles.scss***

```
@import 'normalize.css';
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
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

***src/components/GlobalStyles/GlobalStyles.js***

```
import PropTypes from 'prop-types';

import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
```
> prop-types đã có sẵn trong `react`, dùng để ràng buộc các tham số của component

***src/index.js***

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

- Create a _src/config/indexConfig.js_ and _src/config/routes.js_ files

***_src/config/routes.js_***

```
const routes = {
    home: '/',
    profile: '/user/:nickname',
};

export default routes;
```

***_src/config/indexConfig.js_***

```
import routes from './routes';

const config = {
    routes,
};

export default config;
```

- Create a _src/pages/Home/Home.js_ file

***src/pages/Home/Home.js***

```
function Home() {
    return <h1>Dành cho bạn</h1>;
}

export default Home;
```

## Cấu hình Router/Layout cho dự án

- Create a _src/layouts/DefautLayout/DefautLayout.js_ file

***src/layouts/DefautLayout/DefautLayout.js***

```
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <h1>DefaultLayout</h1>
            {children}
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

```

- Create a _src/layouts/components/Header/Header.js_ and  _src/layouts/components/Footer/Footer.js_ files

***src/layouts/components/Header/Header.js***

```
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <>
            <h1>This is Header</h1>
        </>
    );
}

export default Header;
```

The same with ***src/layouts/components/Footer/Footer.js***

- Create a _src/layouts/indexLayouts.js_

***src/layouts/indexLayouts.js***

```
export { default as DefaultLayout } from './DefaultLayout/DefaultLayout.js';
```

***src/App.js***

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

## Others

`hooks` chứa các custom hooks

`services` ...ongoing

`utils` ...ongoing

# End
Based on the project architecture of F8
