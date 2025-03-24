import { useEffect } from "react";

const useLifeCycles = (mount: Function, unmount: Function) => {
  useEffect(() => {
    if (mount) {
      mount();
    }

    return () => {
      unmount();
    };
  }, []);
};

export default useLifeCycles;
