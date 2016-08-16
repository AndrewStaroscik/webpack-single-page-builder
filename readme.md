#About

This is a basic webpack build system for developing single static pages (as opposed to static sites or single page apps).

Its output is an index.html file with one .js one .css file. This allows the creation of content that uses javascript libraries such as gsap, d3, and others to create content that can be easily embedded into any cms or static site generator without having to customize the content to conform to the particular demands of each platform. 

As long as the platform allows for custom javascript and css to be used on individual pages, this should work.

I started with code from the [SurviveJS Webpack Book](http://survivejs.com/webpack/introduction/) and modified it to meet my needs. 

It is set up to convert stylus to css with autoprefixer for browser compatibility.

Babel is enabled with the es2015 preset. 

The template index file has a div with id of `mainFrame`. The intended use is to have all javascript written target that div. Once the build is done, any html file that contains a div with the id of mainFrame that calls the javascript file should have that code work by injecting content into that div. 

The names of the js and css files can be set in the `webpack.config.js` by modifying the `jsBundle` and  `cssBundle` vars.

#Development

`npm run start` - starts the development server. The page can be viewed at localhost:8080 or over the local network (to preview on mobile devices)

#Production

`npm run build` - generates static resources in the build folder that can be used as sigle page or embeded into a page on a site (such as a post on docpad or jekyll)

#Limitations

This is still a work in progress. It is not a one click deployment solution. Once the index.js, "bundle".js and "main".css files are created they need to be moved to where they are wanted in the containing framework (i.e. jekyll or docpad) and renamed as desired.

They can be renamed during this step as desired, but for everyting to work the html file needs one and only one div with id `mainFrame` 

#Next Steps

* Add a clean step to delete build folder as the first step of the `npm run build` call
* Add more variables to the `webpack.config.js` file to make it easier to customize the target div id (default mainFrame).
* Get [webpack-validator working with stylus](http://disq.us/p/19ptmz7)