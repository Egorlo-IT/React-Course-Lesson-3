import { useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c5b70",
    },
  },
});

function App() {
  const [messageList, setMessageList] = useState([]);
  const [listChat, setListChat] = useState([
    {
      id: 1,
      uid: 1,
      author: "Егор",
      text: " Привет, Макс. Как дела?…",
    },
    {
      id: 2,
      uid: 2,
      author: "Владимир Высоцкий",
      text: " В суету городов и в потоки машин. Возвращаемся мы — просто некуда деться! И спускаемся вниз с покорённых вершин, Оставляя в горах, оставляя в горах своё сердце…",
    },
    {
      id: 3,
      uid: 3,
      author: "Ахмад Сулейманов",
      text: " Как ночь темна! Как ночь грозна! Какая буря завывает! Метели серая стена. Пути-дороги закрывает. Мой вороной едва бредет, Укрыт густой попоной снега…",
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Main
          messageList={messageList}
          setMessageList={setMessageList}
          listChat={listChat}
          setListChat={setListChat}
        />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
