Jekyllrb with Foundation Test
=============================

## To Run

    git clone git@github.com:liquidvisual/jekyllrb-foundation-test.git
    bundler install
    npm install
    bower install
    grunt serve

This repo is the result of running the [Jekyllrb Yeoman generator](https://github.com/robwierzbowski/generator-jekyllrb) with basic settings.

I've integrated Zurb Foundation 5 in the most basic way (only including the Sass files).

##The Problem

The global styles are repeating with every included component (eg. accordion, type, tabs, etc.). I'm not doing anything fancy with the Sass, simply including them as per Zurb's instructions.

It appears the Sass compile is somehow ignoring the [@include exports("global")](https://github.com/wilsonpage/sass-import-once) function. Which allows you to repeat Sass code across multiple components while only outputting them once.

> When included in a SASS module, sass-import-once will prevent the styles being duplicated if @import is called somewhere else. This is cool because it allows every SASS file to declare its own dependencies. This promotes encapulation and allows modules to standalone if need be.