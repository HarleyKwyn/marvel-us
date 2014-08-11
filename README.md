marvel-us
=========

Surf the Marvel API in style.

File Structure Reasoning:
```
public/
  |- css/
  |- app/
  |  |- home/
  |  |  |- home.js
  |  |  |- home.tpl.html
  |  |  |- home.spec.js
  |  |- creator/
  |  |  |- creator.js
  |  |  |- creator.tpl.html
  |  |  |- creator.spec.js
  |  |- comic/
  |  |  |- comic.js
  |  |  |- comic.tpl.html
  |  |  |- comic.spec.js
  |  |- app.js
  |  |- app.spec.js
  | - common/
  |  | MarvelService.js
  |  | InfiniteScroll.js
  | index.html

```

This is designed as a module file structure. Still using separation of concerns with MVC but breaking out the entire app into sub modules such that when you edit one module you can be confident that you're not having side effects on another module.

Gulp is used as a development tool for production tasks like linting, and testing as well as pre-deployment tasks such as concatenating the JS files and minifying into the dist folder. (this still needs to be built out more)

There is a design choice still to be made whether to use a CDN for the dependencies or not as we could use our pre-processing script to ensure that the dependencies used in development and that pass the test are rolled into the final script that is deployed. However, this may effect load times of the application as our one single script file may take a long time to load. This is the importance of uglification and minification however.

Still a work in progress.




