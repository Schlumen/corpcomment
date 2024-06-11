import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtags/HashtagList";
import FeedbackItemsContextProvider from "../constexts/FeedbackItemsContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackItemsContextProvider>
        <Container />
        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
