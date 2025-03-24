import { ConfigProvider } from "./ConfigProvider";
import { useMessage } from "./useMessage";

function Aaa() {
  const message = useMessage();

  return (
    <>
      <button
        onClick={() => {
          message.add({
            content: "message content",
          });
        }}
      >
        top message
      </button>
    </>
  );
}

function App() {
  return (
    <ConfigProvider>
      <div>
        <Aaa></Aaa>
      </div>
    </ConfigProvider>
  );
}

export default App;
