# TLED-React

For prototyping a new TLED site using React.

Eventually this repo and the main TLED repo should be merged into one, but there is a lot of stuff in the old project.  For the sake of simplicity lets just start fresh.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Components

We are using rebass/grid for our grid system, which has styled-system as a dependency, so both of those are available. Tweaks to the grid are in a Grid component.  Use that.

Styled elements like hr and a tags are in a component called Elements. You should check the exports of the elements component to see what we've already done before adding new stuff.

## Style

We are using styled components for style, but create react app also supports importing css and sass direcly. If you need to import stylesheets do it at the component level.  We should be very careful about importing styles at the app level.  We are using Foundation styles at the app level, so those classes are available if needed.  Remember to use `className` instead of `class` when adding classes in jsx code.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

