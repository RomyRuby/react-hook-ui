import Popover from ".";

export default function App() {
  const popoverContent = (
    <div>
      popover content
      <button
        onClick={() => {
          alert(1);
        }}
      >
        alert
      </button>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      placement="bottom"
      trigger="click"
      style={{ margin: "200px" }}
    >
      <button>popover</button>
    </Popover>
  );
}
