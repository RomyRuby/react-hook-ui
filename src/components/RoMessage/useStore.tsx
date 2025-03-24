import { useState } from "react";
import { MessageProps, Position } from ".";

export type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initialState = {
  top: [],
  bottom: [],
};

// 创建消息列表store函数，返回消息列表，和增删改清空方法
function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState,
  });

  return {
    messageList,

    add: (messageProps: MessageProps) => {
      const id = getId(messageProps);

      setMessageList((preState) => {
        // 如果通过消息判断id添加的消息已存在在列表里，直接返回原来的列表
        if (messageProps?.id) {
          const position = getMessagePosition(preState, messageProps.id);
          if (position) return preState;
        }

        // 获取传入的属性，否则用默认值
        const position = messageProps.position || defaultPosition;
        const isTop = position.includes("top");
        // top的将新消息插入topList最前面，bottom的排在bottomList最后面
        const messages = isTop
          ? [{ ...messageProps, id }, ...(preState[position] ?? [])]
          : [...(preState[position] ?? []), { ...messageProps, id }];

        return {
          ...preState,
          [position]: messages,
        };
      });
      // 新增方法，返回新增消息的id
      return id;
    },

    update: (id: number, messageProps: MessageProps) => {
      if (!id) return;

      setMessageList((preState) => {
        // 复制一份之前的消息列表
        const nextState = { ...preState };
        // 找出需要更新消息的位置
        const { position, index } = findMessage(nextState, id);

        // 更新消息数据
        if (position && index !== -1) {
          nextState[position][index] = {
            ...nextState[position][index],
            ...messageProps,
          };
        }

        // 得到新的消息列表
        return nextState;
      });
    },

    remove: (id: number) => {
      setMessageList((prevState) => {
        const position = getMessagePosition(prevState, id);

        if (!position) return prevState;
        return {
          ...prevState,
          [position]: prevState[position].filter((notice) => notice.id !== id),
        };
      });
    },

    clearAll: () => {
      setMessageList({ ...initialState });
    },
  };
}

// 记录id自增
let count = 1;

// 获取id，优先从props里获取，没有就自增
export function getId(messageProps: MessageProps) {
  if (messageProps.id) {
    return messageProps.id;
  }
  count += 1;
  return count;
}

// 通过id找到消息的位置
export function getMessagePosition(messageList: MessageList, id: number) {
  for (const [position, list] of Object.entries(messageList)) {
    if (list.find((item) => item.id === id)) {
      return position as Position;
    }
  }
}

// 通过id找到消息的位置
export function findMessage(messageList: MessageList, id: number) {
  const position = getMessagePosition(messageList, id);

  const index = position
    ? messageList[position].findIndex((message) => message.id === id)
    : -1;

  return {
    position,
    index,
  };
}

export default useStore;
