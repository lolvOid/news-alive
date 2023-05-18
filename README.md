![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/f3ec7cac428902bbf4df9aeca049097657340766c4520a3a.jpg)

## **ALIVE NEWS App**

https://news-alive.vercel.app/#/

The application displays news headlines by fetching from newsapi.org.

Displaying Headlines, Searching and Filtering included.

**Tasks**

*   [x] Home Page (Main Page)
*   [x] Detail view (Sub Page)
*   [x] Toolbar for each headline
    *   [x] 1st button will redirect the user to the selected headline page
    *   [x] 2nd button opens a popup/dialog with a text field to modify the headline's title.
        *   [x] A validator is expected to prevent the new title from being longer than 255 characters.
*   [x] Button to display a history of the visited headlines
*   [x] Add a spinner when the headlines are fetching
*   [x] Button to show an error API call

---

## **About Project**

This Project is built with [Vite](https://vitejs.dev/).

[Vite](https://vitejs.dev/) is a build tool specifically designed for modern web development with frameworks like Vue.js. It focuses on providing fast, efficient, and optimized development experiences.

When using Vite with Vue.js, there are several benefits that contribute to an improved development workflow and enhanced performance:

*   **Fast Development Server**: This allows for a more seamless development experience, with instant hot module replacement (HMR) and quick feedback on code changes.
*   **Efficient Build Process**: Vite performs on-demand compilation and creates optimized bundles for individual modules. This approach improves build times and reduces the size of the generated output.
*   **Native ES Modules Support**: Vite takes advantage of native ES module imports, which are supported by modern browsers.
*   **Plugin Ecosystem**: Vite has a rich ecosystem of plugins that extend its functionality and offer additional features. These plugins can be used to enhance the development workflow, integrate with other tools, optimize assets, and more.
*   **Developer Experience**: Vite provides an excellent developer experience with features like instant server restarts, optimized HMR, and optimized production builds. It supports Vue Single-File Components (SFCs), TypeScript, CSS preprocessors, and other modern web technologies out of the box.

Overall, Vite simplifies the development process, improves performance, and offers a streamlined experience when building Vue.js applications. It combines fast development server capabilities, optimized builds, and seamless integration with Vue-specific features to create a highly efficient development environment.

---

### Dependencies

*    Lists the required dependencies for the application to run. (dependencies):
    *   "vue": The Vue.js framework.
    *   "vuetify": A component framework for Vue.js.
    *   "vue-router": The official router for Vue.js applications.
    *   "vuex": A state management pattern and library for Vue.js applications.
    *   "axios": A popular HTTP client for making API requests.
    *   "moment": A library for parsing, manipulating, and formatting dates and times.
*    Lists the dependencies required during development. (devDependencies):
    *   "eslint": A pluggable JavaScript linter for code quality.
    *   "prettier": An opinionated code formatter.
    *   "vite": A fast development build tool for modern web applications.
    *   "vitest": A testing library for Vue.js applications.

## Project Setup

```plaintext
npm install
```

### Compile and Hot-Reload for Development

```plaintext
npm run dev
```

### Compile and Minify for Production

```plaintext
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```plaintext
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```plaintext
npm run lint
```

---

## Dockerize Application

Using make to build dockerized application.

Created Makefile in root.

make will run Makefile and build docker application.

Without make,

docker-compose shell scripts are created in ./workflows folder.

#### Docker Build

```plaintext
npm run make-start
```

#### Docker Stop

```plaintext
npm run make-stop
```

#### Docker Clean

```plaintext
npm run make-clean
```

#### Docker Restart Container

```plaintext
npm run make-restart                                                                                                                            
```

---

### [Vuetify](https://vuetifyjs.com/) and [Material Design](https://m3.material.io/) Guideline

By following the Material Design guidelines, the Application's UI conforms to a widely recognized and established design system. 

*   **Consistent Design**
*   **Responsive Layout**
*   **Component Framework**
*   **Typography**
*   **Color Scheme**
*   **Motion and Transitions**

First, UI Wireframe was created with [Vuetify UIKit](https://vuetifyjs.com/en/resources/ui-kits/) in [Figma](https://www.figma.com/), then implemented in development.

---

## Extra Feautres

*   API Requests for headlines using [https://newsapi.org/](https://newsapi.org/)
    *   [https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY](https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY) 
    *   [https://newsapi.org/v2/sources?apiKey=API_KEY](https://newsapi.org/v2/sources?apiKey=API_KEY)
    *   [https://newsapi.org/v2/top-headlines?apiKey](https://newsapi.org/v2/top-headlines?apiKey) (Added query, sources, country, category)  following newsapi guideline.

### Vue Components

*   Navigations
    *   Navigation Drawer and Navigation Rail
    *   Bottom Navigation
*   Views
    *   Home
    *   History
    *   Search
    *   Explore
    *   404 Error
*   Components
    *   Headlines Cards
    *   Headline Details 
    *   Error Component

---

## Showcases

**RESPONSIVE LAYOUT**

![Ipad](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/dae6daf452f474e86d7cdba2608c3ea97d3928ae1efd130a.png)![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/8fc00738eb90f85f9e6c245088c79c7b83e87305a7f9cc85.png)![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/ac5a4cdc1736cf41a59b434a668c29c9c72ac82757e5fc78.png)

Filtering by Sources

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/7ab1a51c41c115302b1e7b6b1de7af7140f00bff8e37fba1.png)

Filter by Category

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/5dc9e0067685309929aef882dc2134d8ac67265fcd08bab3.png)

Filtering by Sources

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/0236813ab54c434563a24806aa084a36fe5d2222a9ae9352.png)

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/953497a6631182788c142b002f0448aed6cd9cda9d66794e.png)

Filtering By Country

---

Searching

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/b8d4fe7600f18e277a59ab2f58bb8203fce7724cdd6a8b00.png)![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/ec64d672577cb8173a4bae0fbb3906a4779922da0d3a7472.png)

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/d6bb7fc7d800645d52390997df07033e29faf4f1e0ab008a.png)

EDIT DETAILS

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/72c81ea23a702f785fb302df664aba187108ab16d7f7fa06.png)

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/9ed7a697bd01d557cbf103a68846d21e745396568d5ab2e1.png)![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/7c79eb1493280413d59ef349eed1bba350dedd78bb1628e3.png)![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/7be0f8e4db0893c00c08a45540dd85483ab432ab427641c3.png)

Error Handling

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/9abf8c891deca3de129e1f7a5b01e9d34e638745f6dfa283.png)

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/290fa12adb9d10eee661e7fad6bfe1496762c371dbfe9430.png)
