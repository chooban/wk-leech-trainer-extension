# WK Leech Trainer

In order to learn about the [Web Extensions API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions), I'm
rewriting the [Wanikani Leech Trainer Script](https://community.wanikani.com/t/leech-training-script/21699).

## Development

In order to use more modern JavaScript features, I'm writing it in ES6 and transpiling using Babel. To development,
download, run `yarn install` and then `yarn run build`. This will put everything needed into the `./extension` directory
and from there you can add the extension to your browser.
