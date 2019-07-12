# yall 
#### yet another lazyload library

Yall is a small javascript library (2.47KB) that uses intersection observer to lazy load images (or start events on class added) and with the option to use a callback function on every intersection.

## Documentation

### What is intersection Observer and why would I want to lazy load images?

From the [mdn documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "mdn"): "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.", currently from the information from [caniuse](https://caniuse.com/#feat=intersectionobserver "can i use"), it has a global support of 87.85% and all modern web browsers now support it.

Lazy loading images is a best practice to request the assets only when they are indeed to be used, [google developers](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/ "google developers") talk about it.

### Will this break my site for users in older browsers?

No, in that case it will load all images like lazyload is not present (use the minfied version that is transpilled using babeljs).

### And what about browsers that support the loading attribute?

At this moment [there is no browser supporting it](https://caniuse.com/#feat=loading-lazy-attr "can i use support for loading") out of the box, but it also checks for that and make everything ready for it, but if you have other effects based on class change and callbacks you will need to refactor this.

### What events can I start or use a callback function?
Since everytime an element is "intersected" a class is added you can use css animations or use a callback function that will receive the element being intersected.

### I'm ready to go, what do I need to do?

You just need to load yall.js and create an instance and make it run - run again if you change the DOM. Elements just need the class "yall_lazy" - you can define your classname, and images need to not have src/srcset and have instead data-src/data-srcset attributes.

When an element is intersected the default class yall_loaded is added and the callback function is called.

```html
<script src="yall.min.js"></script>
<script>
  var lazyload = new yall();
  lazyload.run();
</script>
<img class="yall_lazy" data-src="link-to-image">
<div class="yall_lazy">Text that will translate when the class yall_loaded is added.</div>
```

### Ok, what are my start options and API?
A quick example with a callback function that will put in the console.log the element src after it has been intersected:

```html
<script>
var lazyload = new yall({callback:"log"});
lazyload.run();

function log(a){
  console.log(`loaded image with src= ${a.src}.`);
}
</script>
```

The only method available after a instance is created is the .run() method that scans elements with the "yall_lazy" class that have not yet the class "yall_loaded".

The options available when you create an instance are:
```javascript
  let options = {
    //elems to search
    target : "classname", defaults to "yall_lazy"
    //class to add after being loaded
    classToLoad : "classname after intersect", defaults to "yall_loaded";
    //intersectObserver threshold
    threshold : [0,1], defaults to 0;
    //root
    root : element, defaults to null;
    //rootMargin
    rootMargin : intersectObserver rootMargin, defaults to "0px 0px 200px 0px";
    //callback
    callback : "function", defaults to null;
    //activate to ignore the attribute loading="lazy" in supported browsers
    useLoading : bool, defaults to false;
}
```
### Can X or Y be added

Short answer: sure it can. Long answer: I just made this into a library because I only needed a quick working solution with a minimal of options, you can make a pull request or just ask, otherwise you have other options available for a more robust approach.

# Examples 

Check the live [live page](https://giventofly.github.io/yall/).

