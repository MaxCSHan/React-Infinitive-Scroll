# Rakuten F2E Assignment


## How to use

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Design principle
This is an implementation of infinite scrolling component that is built with **React** with the help of **RxJS** and **Axios**.

### Components

The project is consist of one main component **Gallery** for handling the API and the loading logics and its child component **PhotoBlock** as a UI component.


### Lazyloading
To enable lazyloading, I utilized the React useRef, useCallback hook with the IntersectionObserver API, every time the last child of the photoblock being rendered on the screen will trigger the IntersectionObserver listener to increase the loading pagination.
Then the pagination is hooked with the useEffect hook that will call the Picsum Photos API for the next page of datas. Once the data is recieved, it will be push into current data array by setState function.

### API & HTTP request handling
I've used Axios for setting up the HTTP header configuration and RxJS for data stream handling when the requests are unsuccesful or the errors occured. With this combination, I can now  calling APIs by the event stream, and the response can also be treat as data stream. Finally, they are all combined into one observer.