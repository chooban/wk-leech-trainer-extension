# WK Leech Trainer

In order to learn about the [Web Extensions API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions), I'm
rewriting the [Wanikani Leech Trainer Script](https://community.wanikani.com/t/leech-training-script/21699).

## Development

In order to use more modern JavaScript features, I'm writing it in ES6 and transpiling using Babel. To develop,
download, run `yarn install` and then `yarn run build`. This will put everything needed into the `./extension` directory
and from there you can add the extension to your browser.

A mock API is available which emulates the list of lessons returned from Curious Bunny's API. In order to get it up and
running I've used [hotel](https://www.npmjs.com/package/hotel) so that I have fewer issues with HTTPS permissions.
